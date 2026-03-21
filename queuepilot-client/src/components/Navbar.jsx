import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    // Always go to home + pass section
    navigate("/", { state: { scrollTo: sectionId } });
  };

  return (
    <header className="site-header">
      <nav className="navbar">

        {/* LEFT LOGO */}
        <div className="logo">
          <Link to="/">QueuePilot</Link>
        </div>

        {/* CENTER NAV */}
        <ul className="navLinks">
          <li onClick={() => handleNavClick("hero")}>Home</li>
          <li onClick={() => handleNavClick("about")}>About</li>
          <li onClick={() => handleNavClick("features")}>Services</li>
          <li onClick={() => handleNavClick("contact")}>Contact Us</li>
        </ul>

        {/* RIGHT AUTH */}
        <div className="auth">
          {!user ? (
            <Link to="/login">Sign In</Link>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>

      </nav>
    </header>
  );
}