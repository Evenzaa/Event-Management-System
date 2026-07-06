import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { fetchEventDetails } from './services/api';
import EventBanner from './components/EventBanner';
import EventInfo from './components/EventInfo';
import CountdownTimer from './components/CountdownTimer';
import AboutSection from './components/AboutSection';
import EventGallery from './components/EventGallery';
import TicketCard from './components/TicketCard';

function App() {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || params.get("eventId");
    console.log("event id:",id);
    setSelectedEventId(id);
  }, []);

  // Fetch event details whenever selectedEventId changes
  useEffect(() => {
    if (selectedEventId === null) return;

    const loadEventDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await fetchEventDetails(selectedEventId);
        setEventDetails(details);
      } catch (err) {
        setError(err.message || "Failed to load event details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEventDetails();
  }, [selectedEventId]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container pb-5">
      {/* 1. Full-Width Event Banner */}
      {!isLoading && eventDetails && (
        <EventBanner
          bannerImage={eventDetails.bannerImage}
          title={eventDetails.title}
        />
      )}

      {/* 2. Main Overlapping Container */}
      <div className="container px-3 px-sm-4">
        {error ? (
          <div className="alert alert-danger rounded-3 p-4 my-5 text-center shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill fs-3 text-danger mb-2 d-block"></i>
            <h5 className="fw-bold">Something went wrong</h5>
            <p className="mb-0">{error}</p>
            <button 
              onClick={() => setSelectedEventId(selectedEventId)} 
              className="btn btn-outline-danger mt-3 px-4 py-2"
            >
              Try Again
            </button>
          </div>
        ) : isLoading || !eventDetails ? (
          /* Premium Skeleton Loading States */
          <div className="main-content-card">
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="d-flex gap-2 mb-3">
                  <div className="skeleton-pulse rounded-pill" style={{ width: '100px', height: '24px' }}></div>
                  <div className="skeleton-pulse rounded-pill" style={{ width: '80px', height: '24px' }}></div>
                </div>
                <div className="skeleton-pulse skeleton-title mb-4"></div>
                <div className="d-flex flex-wrap gap-4 mt-2 mb-4">
                  <div className="skeleton-pulse rounded" style={{ width: '180px', height: '18px' }}></div>
                  <div className="skeleton-pulse rounded" style={{ width: '150px', height: '18px' }}></div>
                </div>
                <div className="skeleton-pulse mb-3" style={{ width: '120px', height: '14px', borderRadius: '4px' }}></div>
                <div className="d-flex gap-3 mb-4">
                  <div className="skeleton-pulse rounded-3" style={{ width: '64px', height: '64px' }}></div>
                  <div className="skeleton-pulse rounded-3" style={{ width: '64px', height: '64px' }}></div>
                  <div className="skeleton-pulse rounded-3" style={{ width: '64px', height: '64px' }}></div>
                </div>
                <div className="skeleton-pulse skeleton-text mb-2" style={{ width: '100%' }}></div>
                <div className="skeleton-pulse skeleton-text mb-2" style={{ width: '90%' }}></div>
              </div>
              <div className="col-lg-4">
                <div className="skeleton-pulse" style={{ width: '100%', height: '350px', borderRadius: '12px' }}></div>
              </div>
            </div>
          </div>
        ) : (
          /* Actual Page Content exactly matching the screenshot layout */
          <div className="main-content-card">
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-lg-8">
                {/* Event Primary Info: Badges, Title, Meta Details */}
                <EventInfo
                  title={eventDetails.title}
                  tags={eventDetails.tags}
                  date={eventDetails.date}
                  location={eventDetails.location}
                  organizer={eventDetails.organizer}
                />

                {/* Live Countdown Timer */}
                <CountdownTimer targetDate={eventDetails.date} />

                {/* About Section */}
                <AboutSection content={eventDetails.about} />

                {/* Event Gallery */}
                <EventGallery galleryImages={eventDetails.gallery} />
              </div>

              {/* Right Column */}
              <div className="col-lg-4">
                {/* Ticket Booking Card */}
                <TicketCard
                  eventId={eventDetails.id}
                  ticketData={eventDetails.tickets}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Back To Top Button */}
      <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3">
        <button 
          onClick={handleScrollToTop}
          className="back-to-top-btn d-flex align-items-center justify-content-center border"
          title="Scroll to Top"
        >
          <i className="bi bi-chevron-up fs-4"></i>
        </button>
      </div>
    </div>
  );
  
}


export default App;
