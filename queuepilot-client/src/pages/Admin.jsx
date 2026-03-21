import { useState } from "react";
import { useEffect } from "react";
import API from "../services/api";
import "../styles/admin.css";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentToken, setCurrentToken] = useState("");

  const serveNext = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/admin/serve-next");

      setMessage(res.data.message);
      setCurrentToken(res.data.tokenNumber);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  const getCurrent = async () => {
  try {
    const res = await API.get("/admin/current");
    setCurrentToken(res.data.tokenNumber);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  getCurrent();
}, []);

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">QueuePilot</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Queues</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* HEADER */}
        <div className="header">
          <h1>Admin Dashboard</h1>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* NOW SERVING */}
          <div className="card">
            <h3>Now Serving</h3>
            <p>{currentToken || "--"}</p>
          </div>

          {/* CONTROL PANEL */}
          <div className="panel">
            <h2>Queue Control</h2>

            <button onClick={serveNext} disabled={loading}>
              {loading ? "Processing..." : "Serve Next Token"}
            </button>

            {message && (
              <p style={{ marginTop: "10px" }}>{message}</p>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}