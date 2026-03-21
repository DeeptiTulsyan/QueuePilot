import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", { email, password });

    login(res.data);

    // 🔥 ROLE-BASED NAVIGATION
    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    alert(err.response?.data?.message);
  }
};

  return (
    <div className="signin-container">
      <div className="signin-visual">
        <img src="/img/signin_image.png" alt="" />
      </div>

      <div className="signin-form">
        <h1>Sign In</h1>
        <p>Welcome back to QueuePilot</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}