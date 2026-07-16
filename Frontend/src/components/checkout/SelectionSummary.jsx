import Button from '../common/Button';

const SERVICE_FEE_RATE = 0.08;

export default function SelectionSummary({ selectedSeats, onContinue }) {
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const serviceFee = subtotal * SERVICE_FEE_RATE;
  const total = subtotal + serviceFee;

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Your Selection</h3>

      <div className="flex flex-col gap-3 mb-4">
        {selectedSeats.length === 0 && (
          <p className="text-sm text-gray-400">No seats selected yet.</p>
        )}
        {selectedSeats.map((seat) => (
          <div key={seat.id} className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {seat.row} · Seat {seat.number}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {seat.type === 'vip' ? 'VIP' : 'General Admission'}
              </p>
            </div>
            <span className="text-sm font-semibold text-violet-600">${seat.price}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 flex flex-col gap-1 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal ({selectedSeats.length} seats)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 mt-1">
          <span>Total</span>
          <span className="text-violet-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="w-full mt-5"
        disabled={selectedSeats.length === 0}
        onClick={onContinue}
      >
        Continue to Checkout →
      </Button>
    </div>
  );
}