import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminApi } from '../../services/adminApi';
import ApprovalDialog from '../../components/admin/ApprovalDialog';
import RejectionDialog from '../../components/admin/RejectionDialog';
import RegistrationDetailModal from '../../components/admin/RegistrationDetailModal';
import {
  Search,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export default function Registrations() {
  const { adminUser } = useAdminAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [clubFilter, setClubFilter] = useState('ALL');
  const [semesterFilter, setSemesterFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Dialog states
  const [selectedReg, setSelectedReg] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getRegistrations({
        search,
        club: clubFilter,
        semester: semesterFilter,
        status: statusFilter,
        page,
        limit: 8
      });
      setRegistrations(data.registrations);
      setTotalPages(data.totalPages);
      setTotalCount(data.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [search, clubFilter, semesterFilter, statusFilter, page]);

  const handleApprove = async (id) => {
    try {
      await adminApi.approveRegistration(id, adminUser?.name);
      setToastMessage('✓ Application approved successfully. Account activated and credentials sent.');
      await fetchRegistrations();
    } catch (err) {
      console.error('Approve failed:', err);
      setToastMessage(`✕ Approval failed: ${err.message}`);
    } finally {
      setTimeout(() => setToastMessage(''), 6000);
    }
  };

  const handleReject = async (id, reason) => {
    try {
      await adminApi.rejectRegistration(id, reason, adminUser?.name);
      setToastMessage('Application rejected.');
      await fetchRegistrations();
    } catch (err) {
      console.error('Reject failed:', err);
      setToastMessage(`✕ Rejection failed: ${err.message}`);
    } finally {
      setTimeout(() => setToastMessage(''), 6000);
    }
  };

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Registrations Review Hub</h2>
        <p className="dash-welcome-subtitle">
          Review, approve, or reject student membership applications across all technical divisions.
        </p>
      </div>

      {toastMessage && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: toastMessage.includes('approved') ? '#ECFDF5' : '#FEF2F2',
            color: toastMessage.includes('approved') ? '#047857' : '#B91C1C',
            border: `1px solid ${toastMessage.includes('approved') ? '#A7F3D0' : '#FECACA'}`,
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 600,
            fontSize: '0.88rem'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Main Table Card */}
      <div className="admin-table-card">
        {/* Header with Search and Filters Toolbar */}
        <div className="admin-table-header-bar">
          <div>
            <h3 className="admin-table-title">Applications ({totalCount})</h3>
          </div>

          <div className="admin-toolbar">
            {/* Search */}
            <div className="admin-search-wrapper">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search name, roll, email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Club Filter */}
            <select
              className="admin-select"
              value={clubFilter}
              onChange={(e) => {
                setClubFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Club"
            >
              <option value="ALL">All Clubs</option>
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="IoT">IoT</option>
            </select>

            {/* Semester Filter */}
            <select
              className="admin-select"
              value={semesterFilter}
              onChange={(e) => {
                setSemesterFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Semester"
            >
              <option value="ALL">All Semesters</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
            </select>

            {/* Status Filter */}
            <select
              className="admin-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by Status"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table List */}
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Semester</th>
                <th>Club</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-gray)' }}>
                    <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 8px auto' }} />
                    <p style={{ margin: 0 }}>Loading registration records...</p>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-gray)' }}>
                    No registrations found matching the criteria.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => {
                  const dateFormatted = reg.createdAt
                    ? new Date(reg.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      })
                    : 'Recent';

                  return (
                    <tr key={reg._id}>
                      <td className="admin-student-name">{reg.name}</td>
                      <td>{reg.rollNumber}</td>
                      <td>{reg.email}</td>
                      <td>{reg.semester}th Sem</td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--admin-black)' }}>
                          {reg.club}
                        </span>
                      </td>
                      <td>{dateFormatted}</td>
                      <td>
                        {reg.status === 'APPROVED' ? (
                          <span className="status-tag approved">
                            ✓ Approved
                          </span>
                        ) : reg.status === 'REJECTED' ? (
                          <span className="status-tag rejected">
                            ✕ Rejected
                          </span>
                        ) : (
                          <span className="status-tag pending">
                            ◷ Pending
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <button
                            type="button"
                            className="btn-action-view"
                            onClick={() => {
                              setSelectedReg(reg);
                              setDetailModalOpen(true);
                            }}
                          >
                            <Eye size={14} /> View
                          </button>
                          {reg.status === 'PENDING' && (
                            <>
                              <button
                                type="button"
                                className="btn-action-approve"
                                onClick={() => {
                                  setSelectedReg(reg);
                                  setApprovalModalOpen(true);
                                }}
                                title="Approve Application"
                              >
                                <Check size={14} /> Approve
                              </button>
                              <button
                                type="button"
                                className="btn-action-reject"
                                onClick={() => {
                                  setSelectedReg(reg);
                                  setRejectionModalOpen(true);
                                }}
                                title="Reject Application"
                              >
                                <X size={14} /> Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="admin-pagination-bar">
          <span>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong> ({totalCount} total)
          </span>

          <div className="pagination-btn-group">
            <button
              type="button"
              className="pagination-btn"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Previous
            </button>
            <button
              type="button"
              className="pagination-btn"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RegistrationDetailModal
        registration={selectedReg}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onOpenApprove={(reg) => {
          setSelectedReg(reg);
          setApprovalModalOpen(true);
        }}
        onOpenReject={(reg) => {
          setSelectedReg(reg);
          setRejectionModalOpen(true);
        }}
      />

      <ApprovalDialog
        registration={selectedReg}
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        onConfirm={handleApprove}
      />

      <RejectionDialog
        registration={selectedReg}
        isOpen={rejectionModalOpen}
        onClose={() => setRejectionModalOpen(false)}
        onConfirm={handleReject}
      />
    </div>
  );
}
