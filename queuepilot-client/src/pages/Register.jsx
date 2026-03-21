import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/signup.css";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);

      login(res.data); // 🔥 auto login
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="signup-container">
      {/* LEFT IMAGE */}
      <div className="signup-visual">
        <img src="/img/signup_image.png" alt="" />
      </div>

      {/* RIGHT FORM */}
      <div className="signup-form">
        <h1>Create Account</h1>
        <p>Get started with QueuePilot</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full name</label>
            <input
              type="text"
              name="name"
              required
              minLength="3"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              onChange={handleChange}
            />
          </div>

          {/* Optional role (hidden or dropdown if needed) */}
          {/* 
          <select name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> 
          */}

          <button type="submit">Create Account</button>

          <p className="form-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}