import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminApi } from '../../services/adminApi';
import AdminStatCard from '../../components/admin/AdminStatCard';
import ApprovalDialog from '../../components/admin/ApprovalDialog';
import RejectionDialog from '../../components/admin/RejectionDialog';
import RegistrationDetailModal from '../../components/admin/RegistrationDetailModal';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  Eye,
  Check,
  X
} from 'lucide-react';
import { navigate } from '../../utils/router';

export default function AdminDashboard() {
  const { adminUser } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [selectedReg, setSelectedReg] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);

  const loadData = async () => {
    try {
      const [statsData, regsData] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRegistrations({ limit: 5 })
      ]);
      setStats(statsData);
      setRecentRegistrations(regsData.registrations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id) => {
    await adminApi.approveRegistration(id, adminUser?.name);
    await loadData();
  };

  const handleReject = async (id, reason) => {
    await adminApi.rejectRegistration(id, reason, adminUser?.name);
    await loadData();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return <div>Loading admin dashboard...</div>;
  }

  const clubList = [
    { name: 'AI Club', key: 'AI', color: '#8B5CF6' },
    { name: 'Programming Club', key: 'Programming', color: '#2563EB' },
    { name: 'Cybersecurity Club', key: 'Cybersecurity', color: '#10B981' },
    { name: 'IoT Club', key: 'IoT', color: '#F97316' }
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">
          {getGreeting()}, {adminUser?.name || 'Admin'} 👋
        </h2>
        <p className="dash-welcome-subtitle">
          Manage NIELIT Tech Clubs registrations, approval queues, and member directories.
        </p>
      </div>

      {/* 4 Major Stat Cards */}
      <div className="admin-stats-grid">
        <AdminStatCard
          label="Total Applications"
          value={stats?.total || 0}
          icon={FileText}
        />
        <AdminStatCard
          label="Pending Review"
          value={stats?.pending || 0}
          type="pending"
          icon={Clock}
        />
        <AdminStatCard
          label="Approved Members"
          value={stats?.approved || 0}
          type="approved"
          icon={CheckCircle2}
        />
        <AdminStatCard
          label="Rejected"
          value={stats?.rejected || 0}
          type="rejected"
          icon={XCircle}
        />
      </div>

      {/* Applications by Club */}
      <div className="admin-table-card" style={{ padding: '24px', marginBottom: '28px' }}>
        <h3 className="admin-table-title" style={{ marginBottom: '18px' }}>
          Applications by Technical Division
        </h3>
        <div className="club-bars-list">
          {clubList.map((club) => {
            const count = stats?.byClub?.[club.key] || 0;
            const percentage = stats?.total > 0 ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={club.key} className="club-bar-item">
                <div className="club-bar-label-row">
                  <span>{club.name}</span>
                  <span>{count} applications ({percentage}%)</span>
                </div>
                <div className="club-bar-track">
                  <div
                    className="club-bar-fill"
                    style={{ width: `${percentage}%`, background: club.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Registration Requests */}
      <div className="admin-table-card">
        <div className="admin-table-header-bar">
          <h3 className="admin-table-title">Recent Registration Requests</h3>
          <button
            type="button"
            className="editorial-card-action"
            onClick={() => navigate('/admin/registrations')}
          >
            View All Registrations <ArrowRight size={16} />
          </button>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Club</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-gray)' }}>
                    No recent registration requests.
                  </td>
                </tr>
              ) : (
                recentRegistrations.map((reg) => (
                  <tr key={reg._id}>
                    <td className="admin-student-name">{reg.name}</td>
                    <td>{reg.rollNumber}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                        {reg.club}
                      </span>
                    </td>
                    <td>{reg.semester}th Sem</td>
                    <td>
                      {reg.status === 'APPROVED' ? (
                        <span className="status-tag approved" style={{ fontSize: '0.74rem', padding: '3px 8px' }}>
                          ✓ Approved
                        </span>
                      ) : reg.status === 'REJECTED' ? (
                        <span className="status-tag rejected" style={{ fontSize: '0.74rem', padding: '3px 8px' }}>
                          ✕ Rejected
                        </span>
                      ) : (
                        <span className="status-tag pending" style={{ fontSize: '0.74rem', padding: '3px 8px' }}>
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
                              <Check size={14} />
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
                              <X size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
