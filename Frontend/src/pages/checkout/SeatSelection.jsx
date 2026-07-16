
import { useParams, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import Container from '../../components/common/Container';
import SeatMap from '../../components/checkout/SeatMap';
import SelectionSummary from '../../components/checkout/SelectionSummary';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import { getSeatMapForEvent } from '../../data/mockSeats';
import { setEvent, toggleSeat, setAllowedSelections } from '../../store/checkoutSlice';

const LEGEND = [
  { label: 'Available', className: 'bg-blue-500' },
  { label: 'Sold Out', className: 'bg-gray-400' },
  { label: 'VIP', className: 'bg-orange-400' },
  { label: 'Selected', className: 'bg-emerald-500' },
];

export default function SeatSelection() {
  const { eventId } = useParams();
  const location = useLocation(); // NEW
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.checkout.selectedSeats);
  const allowedSelections = useSelector((state) => state.checkout.allowedSelections); // NEW
//   const location = useLocation();
  
  console.log(useLocation().state);

  // Reset selection if the user lands on a different event's seat page
  useEffect(() => {
  dispatch(setEvent(eventId));
  dispatch(setAllowedSelections(location.state?.ticketSelections ?? []));
}, [eventId, dispatch, location.state]);

  // Mock data for now — see "Backend Requirements" for the real endpoint needed
  const seatData = useMemo(() => getSeatMapForEvent(eventId), [eventId]);

  return (
    <div className="min-h-screen bg-[#0b0a14]">
      <div className="bg-white">
        <Container className="flex items-center justify-between py-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Select Your Seats — Electric Dreams Festival 2025
          </h1>
          <CheckoutStepper currentStep={1} />
        </Container>
      </div>

      <Container className="py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col items-center gap-6">
          <SeatMap
            rows={seatData.rows}
            selectedSeats={selectedSeats}
            allowedSelections={allowedSelections}  // NEW
            onToggleSeat={(seat) => dispatch(toggleSeat(seat))}
          />
          <div className="flex gap-6 flex-wrap justify-center">
            {LEGEND.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded ${item.className}`} />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <SelectionSummary
          selectedSeats={selectedSeats}
          onContinue={() => {
            // Route to /checkout — will be wired up when BookingCheckout.jsx exists
          }}
        />
      </Container>
    </div>
  );
}