import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI, authAPI } from "../api/apiClient";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [hourlyRate, setHourlyRate] = useState(500);
  const [rejectionReason, setRejectionReason] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      setLoading(true);
      const user = await authAPI.getCurrentUser();
      setCurrentUser(user);
      
      if (user.role !== 'admin') {
        setError("Access Denied: Only admins can access this panel");
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      setIsAdmin(true);
      fetchApplications();
    } catch (err) {
      setError(`Authentication failed: ${err.message}`);
      console.error(err);
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getTutorApplications();
      setApplications(data);
      
      // Fetch stats
      const statsData = await adminAPI.getDashboardStats();
      setStats(statsData);
      
      setError("");
    } catch (err) {
      setError(`Failed to load applications: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (appId) => {
    try {
      await adminAPI.acceptTutor(appId, hourlyRate);
      alert("Tutor accepted successfully!");
      setSelectedApp(null);
      setHourlyRate(500);
      fetchApplications();
    } catch (err) {
      alert(`Error accepting tutor: ${err.message}`);
    }
  };

  const handleReject = async (appId) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    try {
      await adminAPI.rejectTutor(appId, rejectionReason);
      alert("Tutor rejected successfully!");
      setSelectedApp(null);
      setRejectionReason("");
      fetchApplications();
    } catch (err) {
      alert(`Error rejecting tutor: ${err.message}`);
    }
  };

  const pendingApps = applications.filter((app) => app.status === "new");
  const reviewedApps = applications.filter((app) => app.status === "reviewed");
  const rejectedApps = applications.filter((app) => app.status === "resolved");

  const displayedApps =
    activeTab === "pending"
      ? pendingApps
      : activeTab === "accepted"
        ? reviewedApps
        : rejectedApps;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#333", marginTop: 0, marginBottom: 0 }}>Admin Panel - Tutor Applications</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate("/change-password")}
              style={{
                padding: "10px 15px",
                background: "#ffc107",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              🔐 Change Password
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/admin-login");
              }}
              style={{
                padding: "10px 15px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {!isAdmin ? (
          <div
            style={{
              padding: "30px",
              backgroundColor: "#fee",
              color: "#c33",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            <h2>❌ Access Denied</h2>
            <p>{error || "You do not have permission to access the admin panel."}</p>
            <p style={{ fontSize: "14px", marginTop: "15px" }}>
              {currentUser
                ? `Logged in as: ${currentUser.name} (${currentUser.role})`
                : "Please log in as an admin to continue."}
            </p>
          </div>
        ) : loading ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>Loading applications...</p>
        ) : (
          <>
            {error && (
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#fee",
                  color: "#c33",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}

            {/* Dashboard Stats */}
            {stats && (
              <div style={{ marginBottom: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Pending Applications</p>
                  <h3 style={{ margin: "10px 0 0 0", fontSize: "32px", color: "#007bff", fontWeight: "bold" }}>{stats.applications.pending}</h3>
                </div>
                <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Total Applications</p>
                  <h3 style={{ margin: "10px 0 0 0", fontSize: "32px", color: "#6c757d", fontWeight: "bold" }}>{stats.applications.total}</h3>
                </div>
                <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Active Tutors</p>
                  <h3 style={{ margin: "10px 0 0 0", fontSize: "32px", color: "#28a745", fontWeight: "bold" }}>{stats.tutors.active}</h3>
                </div>
                <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Total Users</p>
                  <h3 style={{ margin: "10px 0 0 0", fontSize: "32px", color: "#6f42c1", fontWeight: "bold" }}>{stats.users.total}</h3>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => setActiveTab("pending")}
                style={{
                  padding: "10px 20px",
                  background: activeTab === "pending" ? "#007bff" : "#ddd",
                  color: activeTab === "pending" ? "white" : "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Pending ({pendingApps.length})
              </button>
              <button
                onClick={() => setActiveTab("accepted")}
                style={{
                  padding: "10px 20px",
                  background: activeTab === "accepted" ? "#28a745" : "#ddd",
                  color: activeTab === "accepted" ? "white" : "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Accepted ({reviewedApps.length})
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                style={{
                  padding: "10px 20px",
                  background: activeTab === "rejected" ? "#dc3545" : "#ddd",
                  color: activeTab === "rejected" ? "white" : "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Rejected ({rejectedApps.length})
              </button>
            </div>

            {displayedApps.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>No applications found</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
            {displayedApps.map((app) => (
              <div
                key={app._id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <h3 style={{ marginTop: 0, color: "#333" }}>{app.name}</h3>
                <p style={{ margin: "8px 0", color: "#666" }}>
                  <strong>Email:</strong> {app.email}
                </p>
                <p style={{ margin: "8px 0", color: "#666" }}>
                  <strong>Phone:</strong> {app.phone || "N/A"}
                </p>
                <p style={{ margin: "8px 0", color: "#666" }}>
                  <strong>Subject:</strong> {app.subject}
                </p>
                <p style={{ margin: "8px 0", color: "#666" }}>
                  <strong>Type:</strong> {app.formType}
                </p>
                <p style={{ margin: "8px 0", color: "#666" }}>
                  <strong>Status:</strong> {app.status}
                </p>
                <p style={{ margin: "8px 0", fontSize: "12px", color: "#999" }}>
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>

                {activeTab === "pending" && (
                  <button
                    onClick={() => setSelectedApp(app)}
                    style={{
                      marginTop: "15px",
                      padding: "10px 15px",
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Review Application
                  </button>
                )}
              </div>
            ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for reviewing application */}
      {selectedApp && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>Review Application</h2>

            <div style={{ marginBottom: "15px" }}>
              <p>
                <strong>Name:</strong> {selectedApp.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedApp.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedApp.phone}
              </p>
              <p>
                <strong>Subject/Expertise:</strong> {selectedApp.subject}
              </p>
              <p>
                <strong>Message/Bio:</strong>
              </p>
              <p
                style={{
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                  minHeight: "80px",
                }}
              >
                {selectedApp.message}
              </p>
            </div>

            {/* Accept Section */}
            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#f0f8ff",
                borderRadius: "5px",
                borderLeft: "4px solid #28a745",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#28a745" }}>Accept Tutor</h3>
              <label style={{ display: "block", marginBottom: "10px" }}>
                <strong>Hourly Rate (₹):</strong>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </label>
              <button
                onClick={() => handleAccept(selectedApp._id)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Accept & Create Profile
              </button>
            </div>

            {/* Reject Section */}
            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#fff5f5",
                borderRadius: "5px",
                borderLeft: "4px solid #dc3545",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#dc3545" }}>Reject Tutor</h3>
              <label style={{ display: "block", marginBottom: "10px" }}>
                <strong>Rejection Reason:</strong>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide a reason for rejection..."
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    minHeight: "60px",
                    boxSizing: "border-box",
                  }}
                />
              </label>
              <button
                onClick={() => handleReject(selectedApp._id)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Reject Application
              </button>
            </div>

            <button
              onClick={() => setSelectedApp(null)}
              style={{
                width: "100%",
                padding: "10px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
