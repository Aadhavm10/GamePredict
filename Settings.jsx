import React from 'react';
import { Settings as SettingsIcon, BarChart2 } from 'lucide-react';
import './GamePredict.css';

const Settings = () => {
  return (
    <div className="gamepredict">
      {/* Header */}
      <header>
        <div className="logo">GamePredict</div>
        <nav>
          <ul>
            <li><a href="#">Team Statistics</a></li>
            <li><a href="#">Prediction History</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
          <div className="profile-icon">
            <img src="https://via.placeholder.com/32" alt="Profile" />
          </div>
        </nav>
      </header>

      <main>
        {/* User Profile Section */}
        <section className="profile-card">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/80" alt="User Avatar" />
          </div>
          <div className="profile-info">
            <h2>User's Name</h2>
            <p className="subtitle">Sports Enthusiast</p>
            <p className="description">Manage your profile settings here</p>
          </div>
          <button className="edit-btn">Edit Profile</button>
        </section>

        {/* Favorite Teams Section */}
        <section className="section-container">
          <div className="section-header">
            <h2>Favorite Teams</h2>
          </div>
          <div className="section-content">
            <div className="teams-grid">
              {/* Team 1 */}
              <div className="team-card">
                <div className="team-icon">
                  <img src="https://via.placeholder.com/64" alt="Basketball" />
                </div>
                <h3>Dallas Mavericks</h3>
                <p>Basketball Team</p>
              </div>

              {/* Team 2 */}
              <div className="team-card">
                <div className="team-icon">
                  <img src="https://via.placeholder.com/64" alt="Basketball" />
                </div>
                <h3>LA Lakers</h3>
                <p>Basketball Team</p>
              </div>

              {/* Team 3 */}
              <div className="team-card">
                <div className="team-icon">
                  <img src="https://via.placeholder.com/64" alt="Basketball" />
                </div>
                <h3>Toronto Raptors</h3>
                <p>Basketball Team</p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Settings Section */}
        <section className="section-container">
          <div className="section-header">
            <h2>Profile Settings <SettingsIcon size={18} /></h2>
            <p>Update your details and preferences</p>
          </div>
          <div className="section-content">
            <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email address" />
                </div>
              </div>
              <div className="form-group full-width">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="### - ### - ####" />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="section-container">
          <div className="section-header">
            <h2>Performance Metrics <BarChart2 size={18} className="chart-icon" /></h2>
          </div>
          <div className="section-content">
            <div className="action-buttons">
              <button className="action-btn">View Predictions</button>
              <button className="action-btn">View Statistics</button>
            </div>
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Total Predictions</h3>
                <p className="metric-value">150</p>
                <p className="metric-change positive">+20%</p>
              </div>
              <div className="metric-card">
                <h3>Win Percentage</h3>
                <p className="metric-value">75%</p>
                <p className="metric-change negative">-5%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Explore More Section */}
        <section className="explore-section">
          <h2>Explore more features/enhancements</h2>
          <div className="divider"></div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <nav>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Settings;
