import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const location = useLocation();

  // 🔥 Handle scrolling after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // slight delay ensures DOM is ready
      }
    }
  }, [location]);

  return (
    <main id="home">

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1>Manage Queues Seamlessly</h1>
          <p>
            QueuePilot helps hospitals and businesses reduce waiting time
            through online token generation and real-time queue tracking.
          </p>
          <Link to="/register" className="cta-btn">Get Started</Link>
        </div>

        <div className="hero-image">
          <img
            src="/img/QueueManagement.jpg"
            alt="Digital queue management system"
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about" id="about">
        <div className="about-header">
          <h2>About QueuePilot</h2>
          <p>Smart queue management designed for modern healthcare systems.</p>
        </div>

        <div className="about-content">
          <p>
            QueuePilot is a digital queue management platform that helps hospitals
            eliminate long waiting lines by allowing patients to book appointments
            online and receive real-time token updates.
          </p>

          <p>
            By analyzing average consultation time per doctor, QueuePilot intelligently
            estimates waiting time for each patient, ensuring better time management
            for both hospitals and visitors.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Everything you need to manage queues efficiently and intelligently.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Online Appointments</h3>
            <p>Patients can book appointments remotely without visiting the hospital.</p>
          </div>

          <div className="feature-card">
            <h3>Token Generation</h3>
            <p>Automatic token assignment ensures a smooth and organized queue.</p>
          </div>

          <div className="feature-card">
            <h3>Estimated Wait Time</h3>
            <p>Each patient receives an estimated consultation time based on queue load.</p>
          </div>

          <div className="feature-card">
            <h3>Real-Time Queue Tracking</h3>
            <p>Live queue updates help patients arrive exactly when needed.</p>
          </div>

          <div className="feature-card">
            <h3>Admin Dashboard</h3>
            <p>Hospitals and doctors can manage schedules, queues, and patient flow.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-container">

          <div className="footer-brand">
            <h3>QueuePilot</h3>
            <p>
              Smart queue management system for hospitals and service-based businesses.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</li>
              <li onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>About</li>
              <li onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>Features</li>
              <li onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Contact</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: support@queuepilot.com</p>
            <p>Phone: +91 90000 00000</p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2025 QueuePilot. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}