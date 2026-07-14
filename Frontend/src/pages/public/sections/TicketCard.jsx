import { useState, useEffect } from 'react';
import { bookTickets } from '../../../services/api';
import Button from '../../../components/common/Button';

export default function TicketCard({ eventId, ticketData }) {
  const { remaining, options } = ticketData;
  
  const [quantities, setQuantities] = useState({});
  const [isBooking, setIsBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const initialQuantities = {};
    options?.forEach(opt => {
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
  
  const totalPrice = options?.reduce((sum, opt) => {
    const qty = quantities[opt.id] || 0;
    return sum + (qty * opt.price);
  }, 0) || 0;

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
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
      <h5 className="text-xl font-bold text-slate-900 mb-1">Select Tickets</h5>
      <p className="text-red-500 text-sm font-semibold italic mb-6">{remaining} tickets remaining</p>

      {bookingResult && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-6 relative">
          <h6 className="font-bold mb-1">Booking Confirmed!</h6>
          <p className="text-sm mb-3">{bookingResult.message}</p>
          <div className="w-full h-px bg-green-200 mb-3"></div>
          <div className="text-sm flex justify-between">
            <span className="text-green-700 opacity-80">Booking ID:</span>
            <span className="font-bold">{bookingResult.bookingId}</span>
          </div>
          <button 
            type="button" 
            className="absolute top-3 right-3 text-green-600 hover:text-green-800" 
            onClick={() => setBookingResult(null)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 text-red-600 rounded-xl p-3 mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-5 mb-6">
        {options?.map((option) => (
          <div key={option.id} className="flex justify-between items-start border-b border-slate-100 pb-5 last:border-0 last:pb-0">
            <div className="pr-4">
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <span className="font-bold text-slate-900 text-[15px]">{option.name}</span>
                {option.isHot && (
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">HOT</span>
                )}
              </div>
              <span className="text-slate-500 text-xs">{option.description}</span>
            </div>

            <div className="flex flex-col items-end gap-3">
              <span className="font-bold text-violet-600 text-lg">${option.price}</span>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement(option.id)}
                  disabled={!quantities[option.id]}
                  className="w-7 h-7 rounded bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                </button>
                <span className="font-semibold text-slate-900 w-4 text-center text-sm">{quantities[option.id] || 0}</span>
                <button
                  onClick={() => handleIncrement(option.id)}
                  className="w-7 h-7 rounded bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 pt-2">
        <span className="font-medium text-slate-600 text-sm">Total ({totalTickets} tickets)</span>
        <span className="font-extrabold text-slate-900 text-xl">${totalPrice.toFixed(2)}</span>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleBookNow}
        disabled={isBooking}
      >
        {isBooking ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            Book Now
          </>
        )}
      </Button>

      <div className="text-center mt-4">
        <span className="text-slate-400 text-[10px] sm:text-[11px] flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Secure checkout · Free cancellation · E-ticket delivery
        </span>
      </div>
    </div>
  );
}
