import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import { Search, Users, Eye, CheckCircle2, X } from 'lucide-react';
import UserAvatar from '../../components/dashboard/UserAvatar';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [clubFilter, setClubFilter] = useState('ALL');
  const [semesterFilter, setSemesterFilter] = useState('ALL');

  // Selected Student Profile Modal
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      try {
        const data = await adminApi.getStudents({
          search,
          club: clubFilter,
          semester: semesterFilter
        });
        setStudents(data);
      } catch (e) {
        console.error('Failed to load students:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, [search, clubFilter, semesterFilter]);

  return (
    <div>
      <div className="dash-welcome-banner">
        <h2 className="dash-welcome-title">Enrolled Students Directory</h2>
        <p className="dash-welcome-subtitle">
          Verified active student members across all technical club chapters.
        </p>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header-bar">
          <div>
            <h3 className="admin-table-title">Active Members ({students.length})</h3>
          </div>

          <div className="admin-toolbar">
            <div className="admin-search-wrapper">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="admin-select"
              value={clubFilter}
              onChange={(e) => setClubFilter(e.target.value)}
              aria-label="Filter by Club"
            >
              <option value="ALL">All Clubs</option>
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="IoT">IoT</option>
            </select>

            <select
              className="admin-select"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              aria-label="Filter by Semester"
            >
              <option value="ALL">All Semesters</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
            </select>
          </div>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Club</th>
                <th>Semester</th>
                <th>Account Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--admin-gray)' }}>
                    Loading active student members...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--admin-gray)' }}>
                    No enrolled students found.
                  </td>
                </tr>
              ) : (
                students.map((st) => (
                  <tr key={st._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <UserAvatar name={st.name} />
                        <span className="admin-student-name">{st.name}</span>
                      </div>
                    </td>
                    <td>{st.rollNumber}</td>
                    <td>{st.email}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--admin-dark-blue)' }}>
                        {st.club} Club
                      </span>
                    </td>
                    <td>{st.semester}th Sem</td>
                    <td>
                      <span className="status-tag approved" style={{ fontSize: '0.74rem', padding: '3px 8px' }}>
                        <CheckCircle2 size={12} /> Active
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-action-view"
                        onClick={() => setSelectedStudent(st)}
                      >
                        <Eye size={14} /> View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Student Profile</h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <UserAvatar name={selectedStudent.name} size="large" />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: 'var(--admin-dark-blue)' }}>
                    {selectedStudent.name}
                  </h4>
                  <p style={{ margin: 0, color: 'var(--admin-gray)', fontSize: '0.88rem' }}>
                    Roll No: <strong>{selectedStudent.rollNumber}</strong> • {selectedStudent.club} Club
                  </p>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Official Email</span>
                  <span className="detail-value">{selectedStudent.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Semester</span>
                  <span className="detail-value">{selectedStudent.semester}th Semester</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Club Chapter</span>
                  <span className="detail-value highlight">{selectedStudent.club} Club</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Status</span>
                  <span className="detail-value" style={{ color: '#047857', fontWeight: 600 }}>Active</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Joined / Approved Date</span>
                  <span className="detail-value">
                    {selectedStudent.joinedDate ? new Date(selectedStudent.joinedDate).toLocaleDateString('en-GB') : '17 Sep 2026'}
                  </span>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="dash-btn dash-btn-secondary"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
