import React from 'react';

const Navbar = () => {
  return (
    <header className="eventpass-navbar sticky-top shadow-sm z-3">
      <div className="container px-3 px-sm-4 d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <a href="/" className="navbar-logo-container">
          <div className="logo-dot"></div>
          <span className="logo-text">EventPass</span>
        </a>

        {/* Navigation Links */}
        <nav className="d-none d-lg-flex align-items-center gap-4">
          <a href="#explore" className="nav-link-custom">Explore</a>
          <a href="#categories" className="nav-link-custom">Categories</a>
          <a href="#organizers" className="nav-link-custom">Organizers</a>
          <a href="#pricing" className="nav-link-custom">Pricing</a>
        </nav>

        {/* Auth Buttons */}
        <div className="d-flex align-items-center gap-3">
          <a href="#login" className="nav-link-custom fw-semibold me-2">Log In</a>
          <a href="#get-started" className="btn-primary-gradient text-nowrap" style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px' }}>
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
