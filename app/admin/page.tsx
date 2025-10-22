"use client";

import { useEffect } from 'react';

export default function AdminPanel() {
  useEffect(() => {
    document.title = 'Admin Panel - Sneha Sourabha';
  }, []);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <style jsx global>{`
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-h1 {
          text-align: center;
          margin-bottom: 10px;
          color: #fbbf24;
          font-size: 2rem;
        }
        .admin-subtitle {
          text-align: center;
          margin-bottom: 30px;
          color: #94a3b8;
        }
        .admin-auth-section {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .admin-auth-section input {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(0,0,0,0.3);
          color: white;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .admin-auth-section button {
          width: 100%;
          padding: 12px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
        }
        .admin-auth-section button:hover {
          background: #059669;
        }
        .admin-section {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .admin-section h2 {
          color: #fbbf24;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }
        .admin-button-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 15px;
        }
        .admin-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .admin-btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
        }
        .admin-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        }
        .admin-btn-success {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }
        .admin-btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16,185,129,0.4);
        }
        .admin-btn-danger {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }
        .admin-btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239,68,68,0.4);
        }
        .admin-output {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 15px;
          max-height: 400px;
          overflow-y: auto;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .admin-input-group {
          margin-bottom: 15px;
        }
        .admin-input-group label {
          display: block;
          margin-bottom: 5px;
          color: #cbd5e1;
          font-weight: 500;
        }
        .admin-input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(0,0,0,0.3);
          color: white;
          font-size: 14px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        .admin-table th, .admin-table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
        }
        .admin-table th {
          background: rgba(251,191,36,0.1);
          color: #fbbf24;
          font-weight: 600;
        }
        .admin-table tr:hover {
          background: rgba(255,255,255,0.03);
        }
        .admin-action-btn {
          padding: 6px 12px;
          font-size: 12px;
          margin-right: 5px;
        }
        .admin-status-error {
          padding: 8px 12px;
          border-radius: 6px;
          background: #ef4444;
          color: white;
          font-size: 12px;
          font-weight: 600;
          margin-top: 10px;
          display: inline-block;
        }
      `}</style>

      <div className="admin-container">
        <h1 className="admin-h1">🔐 Admin Panel</h1>
        <p className="admin-subtitle">Sneha Sourabha District Conference 2025-26</p>

        {/* Authentication Section */}
        <div className="admin-auth-section" id="authSection">
          <h2>🔑 Authentication Required</h2>
          <input type="password" id="adminPassword" placeholder="Enter admin password" />
          <button onClick={() => (window as any).authenticate()}>Login</button>
          <div id="authStatus"></div>
        </div>

        {/* Main Panel */}
        <div id="mainPanel" style={{display: 'none'}}>
          
          {/* Quick Actions */}
          <div className="admin-section">
            <h2>⚡ Quick Actions</h2>
            <div className="admin-button-group">
              <button className="admin-btn admin-btn-primary" onClick={() => (window as any).viewPending()}>📋 View Pending</button>
              <button className="admin-btn admin-btn-primary" onClick={() => (window as any).viewAll()}>📊 View All</button>
              <button className="admin-btn admin-btn-primary" onClick={() => (window as any).viewStats()}>📈 Statistics</button>
              <button className="admin-btn admin-btn-danger" onClick={() => (window as any).runMigration()}>🔧 Add Notification Columns</button>
            </div>
          </div>

          {/* Approve/Reject Section */}
          <div className="admin-section">
            <h2>✅ Approve or Reject Registration</h2>
            <div className="admin-input-group">
              <label>Registration ID:</label>
              <input type="number" id="regId" placeholder="Enter registration ID" />
            </div>
            <div className="admin-input-group">
              <label>Verified By:</label>
              <input type="text" id="verifiedBy" defaultValue="Admin Kiran" />
            </div>
            <div className="admin-input-group">
              <label>Admin Notes:</label>
              <input type="text" id="adminNotes" placeholder="e.g., Payment verified in bank statement" />
            </div>
            <div className="admin-button-group">
              <button className="admin-btn admin-btn-success" onClick={() => (window as any).approveRegistration()}>✅ Approve</button>
              <button className="admin-btn admin-btn-danger" onClick={() => (window as any).rejectRegistration()}>❌ Reject</button>
            </div>
          </div>

          {/* Send Notification Section */}
          <div className="admin-section">
            <h2>📧 Send Notification</h2>
            <div className="admin-input-group">
              <label>Registration ID:</label>
              <input type="number" id="notifRegId" placeholder="Enter registration ID" />
            </div>
            <div className="admin-button-group">
              <button className="admin-btn admin-btn-success" onClick={() => (window as any).sendApprovalNotification()}>📨 Send Approval</button>
              <button className="admin-btn admin-btn-danger" onClick={() => (window as any).sendRejectionNotification()}>📨 Send Rejection</button>
            </div>
          </div>

          {/* Output Section */}
          <div className="admin-section">
            <h2>📤 Output</h2>
            <div id="output" className="admin-output">Ready. Please authenticate and select an action.</div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          let authToken = '';
          const API_BASE = window.location.origin + '/api';

          window.authenticate = function() {
            const password = document.getElementById('adminPassword').value;
            authToken = password;
            
            fetch(API_BASE + '/admin/stats', {
              headers: { 'Authorization': 'Bearer ' + authToken }
            })
            .then(r => r.json())
            .then(data => {
              if (data.success) {
                document.getElementById('authSection').style.display = 'none';
                document.getElementById('mainPanel').style.display = 'block';
                log('✅ Authentication successful!');
              } else {
                document.getElementById('authStatus').innerHTML = '<div class="admin-status-error">❌ Invalid password</div>';
              }
            })
            .catch(err => {
              document.getElementById('authStatus').innerHTML = '<div class="admin-status-error">❌ Authentication failed</div>';
            });
          }

          function log(message) {
            document.getElementById('output').textContent = message;
          }

          function logJSON(data) {
            document.getElementById('output').textContent = JSON.stringify(data, null, 2);
          }

          function logTable(data) {
            if (!data || data.length === 0) {
              log('No data to display');
              return;
            }
            
            let html = '<table class="admin-table"><thead><tr>';
            const keys = Object.keys(data[0]);
            keys.forEach(key => {
              html += '<th>' + key + '</th>';
            });
            html += '<th>Actions</th></tr></thead><tbody>';
            
            data.forEach(row => {
              html += '<tr>';
              keys.forEach(key => {
                let value = row[key];
                if (value === null || value === undefined) value = '-';
                if (typeof value === 'string' && value.length > 50) value = value.substring(0, 50) + '...';
                html += '<td>' + value + '</td>';
              });
              html += '<td><button class="admin-btn admin-btn-success admin-action-btn" onclick="approveById(' + row.id + ')">✅</button><button class="admin-btn admin-btn-danger admin-action-btn" onclick="rejectById(' + row.id + ')">❌</button><button class="admin-btn admin-btn-primary admin-action-btn" onclick="notifyById(' + row.id + ')">📧</button></td></tr>';
            });
            
            html += '</tbody></table>';
            document.getElementById('output').innerHTML = html;
          }

          window.viewPending = async function() {
            log('Loading pending registrations...');
            try {
              const response = await fetch(API_BASE + '/admin/registrations?payment_status=pending', {
                headers: { 'Authorization': 'Bearer ' + authToken }
              });
              const data = await response.json();
              if (data.success) {
                logTable(data.data);
              } else {
                log('❌ Error: ' + data.error);
              }
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.viewAll = async function() {
            log('Loading all registrations...');
            try {
              const response = await fetch(API_BASE + '/admin/registrations', {
                headers: { 'Authorization': 'Bearer ' + authToken }
              });
              const data = await response.json();
              if (data.success) {
                logTable(data.data);
              } else {
                log('❌ Error: ' + data.error);
              }
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.viewStats = async function() {
            log('Loading statistics...');
            try {
              const response = await fetch(API_BASE + '/admin/stats', {
                headers: { 'Authorization': 'Bearer ' + authToken }
              });
              const data = await response.json();
              logJSON(data);
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.runMigration = async function() {
            if (!confirm('Run database migration to add notification columns?')) return;
            log('Running migration...');
            try {
              const response = await fetch(API_BASE + '/db/add-notification-columns');
              const data = await response.json();
              logJSON(data);
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.approveRegistration = async function() {
            const id = document.getElementById('regId').value;
            const verifiedBy = document.getElementById('verifiedBy').value;
            const adminNotes = document.getElementById('adminNotes').value;
            
            if (!id) {
              alert('Please enter a registration ID');
              return;
            }

            log('Approving registration...');
            try {
              const response = await fetch(API_BASE + '/admin/registrations', {
                method: 'PATCH',
                headers: {
                  'Authorization': 'Bearer ' + authToken,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: parseInt(id),
                  payment_status: 'verified',
                  verified_by: verifiedBy,
                  admin_notes: adminNotes
                })
              });
              const data = await response.json();
              logJSON(data);
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.rejectRegistration = async function() {
            const id = document.getElementById('regId').value;
            const verifiedBy = document.getElementById('verifiedBy').value;
            const adminNotes = document.getElementById('adminNotes').value;
            
            if (!id) {
              alert('Please enter a registration ID');
              return;
            }

            if (!adminNotes) {
              alert('Please provide a reason in Admin Notes');
              return;
            }

            log('Rejecting registration...');
            try {
              const response = await fetch(API_BASE + '/admin/registrations', {
                method: 'PATCH',
                headers: {
                  'Authorization': 'Bearer ' + authToken,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: parseInt(id),
                  payment_status: 'rejected',
                  verified_by: verifiedBy,
                  admin_notes: adminNotes
                })
              });
              const data = await response.json();
              logJSON(data);
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.sendApprovalNotification = async function() {
            const id = document.getElementById('notifRegId').value;
            
            if (!id) {
              alert('Please enter a registration ID');
              return;
            }

            log('Sending approval notification...');
            try {
              const response = await fetch(API_BASE + '/admin/send-notification', {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer ' + authToken,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  registration_id: parseInt(id),
                  notification_type: 'email_sms',
                  status: 'verified'
                })
              });
              const data = await response.json();
              logJSON(data);
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.sendRejectionNotification = async function() {
            const id = document.getElementById('notifRegId').value;
            
            if (!id) {
              alert('Please enter a registration ID');
              return;
            }

            log('Sending rejection notification...');
            try {
              const response = await fetch(API_BASE + '/admin/send-notification', {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer ' + authToken,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  registration_id: parseInt(id),
                  notification_type: 'email_sms',
                  status: 'rejected'
                })
              });
              const data = await response.json();
              logJSON(data);
            } catch (err) {
              log('❌ Network error: ' + err.message);
            }
          }

          window.approveById = async function(id) {
            document.getElementById('regId').value = id;
            document.getElementById('adminNotes').value = 'Payment verified';
            await window.approveRegistration();
          }

          window.rejectById = async function(id) {
            const reason = prompt('Enter rejection reason:');
            if (!reason) return;
            document.getElementById('regId').value = id;
            document.getElementById('adminNotes').value = reason;
            await window.rejectRegistration();
          }

          window.notifyById = async function(id) {
            const type = confirm('Click OK for Approval notification, Cancel for Rejection notification');
            document.getElementById('notifRegId').value = id;
            if (type) {
              await window.sendApprovalNotification();
            } else {
              await window.sendRejectionNotification();
            }
          }
        })();
      `}} />
    </div>
  );
}
