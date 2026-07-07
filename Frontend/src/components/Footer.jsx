import React from 'react';

const Footer = () => {
  return (
    <footer className="eventpass-footer py-5 mt-5">
      <div className="container px-3 px-sm-4">
        <div className="row g-4">
          {/* Logo & Slogan Column */}
          <div className="col-lg-5 col-md-12 mb-4 mb-lg-0">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="logo-dot" style={{ width: '20px', height: '20px', borderRadius: '5px' }}></div>
              <span className="footer-logo-text">EventPass</span>
            </div>
            <p className="small-text-style text-light-muted mb-4" style={{ maxWidth: '320px', lineHeight: '1.6' }}>
              Your gateway to unforgettable live experiences. Discover, book, and attend events worldwide.
            </p>
          </div>

          {/* Quick Links Columns */}
          <div className="col-lg-7 col-md-12">
            <div className="row g-4">
              {/* Column 1: Platform */}
              <div className="col-4">
                <h6 className="footer-link-group-title mb-3">Platform</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                  <li><a href="#browse" className="footer-link">Browse Events</a></li>
                  <li><a href="#bookings" className="footer-link">My Bookings</a></li>
                  <li><a href="#favorites" className="footer-link">Favorites</a></li>
                </ul>
              </div>

              {/* Column 2: Organizers */}
              <div className="col-4">
                <h6 className="footer-link-group-title mb-3">Organizers</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                  <li><a href="#create" className="footer-link">Create Event</a></li>
                  <li><a href="#dashboard" className="footer-link">Dashboard</a></li>
                  <li><a href="#analytics" className="footer-link">Analytics</a></li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div className="col-4">
                <h6 className="footer-link-group-title mb-3">Company</h6>
                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                  <li><a href="#about" className="footer-link">About Us</a></li>
                  <li><a href="#careers" className="footer-link">Careers</a></li>
                  <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-secondary opacity-25" />

        {/* Bottom Metadata & Copyright */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small-text-style">
          <span className="text-light-muted">© 2025 EventPass. All rights reserved.</span>
          <div className="d-flex gap-3">
            <a href="#terms" className="footer-link text-light-muted">Terms</a>
            <a href="#privacy" className="footer-link text-light-muted">Privacy</a>
            <a href="#cookies" className="footer-link text-light-muted">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
