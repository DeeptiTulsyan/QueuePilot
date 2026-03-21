import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/user.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= GET STATUS =================
  const getStatus = async () => {
    try {
      const res = await API.get("/queue/status");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= JOIN QUEUE =================
  const joinQueue = async () => {
    try {
      setLoading(true);
      setError("");

      await API.post("/queue/join");
      await getStatus();

    } catch (err) {
      setError(err.response?.data?.message || "Error joining queue");
    } finally {
      setLoading(false);
    }
  };

  // ================= CANCEL =================
  const cancelQueue = async () => {
    try {
      setLoading(true);
      setError("");

      await API.post("/queue/cancel");
      await getStatus();

    } catch (err) {
      setError(err.response?.data?.message || "Error cancelling token");
    } finally {
      setLoading(false);
    }
  };

  // ================= AUTO REFRESH =================
  useEffect(() => {
    getStatus();

    const interval = setInterval(() => {
      getStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">

      {/* WELCOME */}
      <div className="welcome">
        <h1>Welcome, {user?.name} 👋</h1>
        <p>Your queue status is shown below</p>
      </div>

      {/* STATUS CARDS */}
      <div className="status-grid">

        <div className="status-card">
          <p>Your Token</p>
          <div className="big">
            {data?.tokenNumber || "--"}
          </div>
        </div>

        <div className="status-card">
          <p>Estimated Wait</p>
          <div className="big">
            {data?.estimatedWait ?? "--"} mins
          </div>
        </div>

        <div className="status-card">
          <p>People Ahead</p>
          <div className="big">
            {data?.peopleAhead ?? "--"}
          </div>
        </div>

      </div>

      {/* QUEUE INFO */}
      <div className="queue-details">
        <h2>Queue Information</h2>
        <ul>
          <li><strong>Department:</strong> General Medicine</li>
          <li><strong>Doctor:</strong> Dr. Sharma</li>
          <li>
            <strong>Status:</strong>{" "}
            {data?.status || "Not in queue"}
          </li>
        </ul>
      </div>

      {/* ACTIONS */}
      <div className="actions">
        <button
          className="secondary"
          onClick={joinQueue}
          disabled={loading}
        >
          {loading ? "Processing..." : "Join Queue"}
        </button>

        <button
          className="danger"
          onClick={cancelQueue}
          disabled={loading}
        >
          {loading ? "Processing..." : "Cancel Token"}
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="error-text">{error}</p>}

      {/* FOOTER */}
      <div className="footer">
        © 2025 QueuePilot
      </div>

    </div>
  );
}