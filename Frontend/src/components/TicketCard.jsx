import React, { useState, useEffect } from 'react';
import { bookTickets } from '../services/api';

const TicketCard = ({ eventId, ticketData }) => {
  const { remaining, options } = ticketData;
  
  // Track quantities for each ticket type
  const [quantities, setQuantities] = useState({});
  const [isBooking, setIsBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset quantities when eventId changes
  useEffect(() => {
    const initialQuantities = {};
    options.forEach(opt => {
      initialQuantities[opt.id] = 0;
    });
    setQuantities(initialQuantities);
    setBookingResult(null);
    setErrorMsg('');
  }, [eventId, options]);

  const handleIncrement = (ticketId) => {
    setQuantities(prev => ({
      ...prev,
      [ticketId]: (prev[ticketId] || 0) + 1
    }));
    setErrorMsg('');
  };

  const handleDecrement = (ticketId) => {
    setQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, (prev[ticketId] || 0) - 1)
    }));
    setErrorMsg('');
  };

  const totalTickets = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  
  const totalPrice = options.reduce((sum, opt) => {
    const qty = quantities[opt.id] || 0;
    return sum + (qty * opt.price);
  }, 0);

  const handleBookNow = async () => {
    if (totalTickets === 0) {
      setErrorMsg('Please select at least 1 ticket before booking.');
      return;
    }
    
    setIsBooking(true);
    setErrorMsg('');
    try {
      const response = await bookTickets(eventId, quantities);
      setBookingResult(response);
      // Reset quantities on successful booking
      const resetQuantities = {};
      options.forEach(opt => {
        resetQuantities[opt.id] = 0;
      });
      setQuantities(resetQuantities);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during booking.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="ticket-card bg-white p-4 rounded-4 shadow-lg border border-light-subtle position-sticky" style={{ top: '24px' }}>
      <h5 className="fw-bold text-dark mb-1">Select Tickets</h5>
      <p className="text-danger small fw-semibold mb-4" style={{ color: 'var(--error-color)' }}>{remaining} tickets remaining</p>

      {/* Booking Success Alert */}
      {bookingResult && (
        <div className="alert alert-success alert-dismissible fade show rounded-3 p-3 mb-4" role="alert">
          <h6 className="alert-heading fw-bold mb-1">Booking Confirmed!</h6>
          <p className="small mb-2">{bookingResult.message}</p>
          <hr className="my-2" />
          <div className="small d-flex justify-content-between">
            <span className="text-secondary">Booking ID:</span>
            <span className="fw-bold text-dark">{bookingResult.bookingId}</span>
          </div>
          <button type="button" className="btn-close" onClick={() => setBookingResult(null)} aria-label="Close"></button>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="alert alert-danger rounded-3 p-3 mb-4" role="alert">
          <span className="small">{errorMsg}</span>
        </div>
      )}

      {/* Ticket options */}
      <div className="ticket-options-container mb-4">
        {options.map((option) => (
          <div key={option.id} className="ticket-option-row py-3 border-bottom border-light-subtle d-flex justify-content-between align-items-start">
            <div className="pe-3">
              <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                <span className="fw-bold text-dark fs-6">{option.name}</span>
                {option.isHot && <span className="badge-hot">HOT</span>}
              </div>
              <span className="text-secondary small-description">{option.description}</span>
            </div>

            <div className="d-flex flex-column align-items-end gap-2">
              <span className="ticket-price fw-bold fs-5">${option.price}</span>
              
              {/* Quantity Selector */}
              <div className="quantity-selector d-flex align-items-center">
                <button
                  onClick={() => handleDecrement(option.id)}
                  className="btn btn-quantity-minus d-flex align-items-center justify-content-center"
                  disabled={!quantities[option.id]}
                  aria-label="Decrease quantity"
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="quantity-display fw-semibold">{quantities[option.id] || 0}</span>
                <button
                  onClick={() => handleIncrement(option.id)}
                  className="btn btn-quantity-plus d-flex align-items-center justify-content-center"
                  aria-label="Increase quantity"
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold text-dark">Total ({totalTickets} tickets)</span>
        <span className="fw-extrabold text-dark fs-4">${totalPrice.toFixed(2)}</span>
      </div>

      {/* Book Button */}
      <button
        onClick={handleBookNow}
        className="btn-primary-gradient w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
        disabled={isBooking}
      >
        {isBooking ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span>Processing Booking...</span>
          </>
        ) : (
          <>
            <i className="bi bi-ticket-perforated-fill"></i>
            <span>Book Now</span>
          </>
        )}
      </button>

      {/* Trust Footer */}
      <div className="trust-footer text-center mt-3">
        <span className="text-secondary-muted small-text">
          <i className="bi bi-shield-lock-fill text-muted me-1"></i>
          Secure checkout · Free cancellation · E-ticket delivery
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
