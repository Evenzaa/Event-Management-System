const STATUS_CLASSES = {
  vip: 'bg-orange-400 hover:bg-orange-500',
  general: 'bg-blue-500 hover:bg-blue-600',
  sold: 'bg-gray-400 cursor-not-allowed',
  selected: 'bg-emerald-500 hover:bg-emerald-600',
  capped: 'bg-gray-300 cursor-not-allowed', // NEW
};

export default function SeatMap({ rows, selectedSeats, allowedSelections = [], onToggleSeat }) {
  const isSelected = (seatId) => selectedSeats.some((s) => s.id === seatId);

  // NEW
  const getAllowedForType = (type) =>
  allowedSelections.find((a) => a.type === type);
  
  // NEW
  const countSelectedOfType = (type) =>
  selectedSeats.filter((s) => s.type === type).length;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-md">
        <p className="text-center text-white font-semibold tracking-widest mb-2">STAGE</p>
        <div className="h-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
      </div>

      {rows.map((row) => {
        // NEW — computed once per row, before rendering its seats
        const allowedInfo = getAllowedForType(row.type);
        const noRestrictions = allowedSelections.length === 0;
        const cap = allowedInfo ? allowedInfo.quantity : 0;
        const selectedCount = countSelectedOfType(row.type);
        const isTypeFull = !noRestrictions && selectedCount >= cap;
        const price = allowedInfo ? allowedInfo.price : row.price;

        return (
        <div key={row.id} className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white">
            {row.label}
          </span>
          <div className="flex gap-2 flex-wrap justify-center">
            {row.seats.map((seat) => {
              const selected = isSelected(seat.id);
              const blocked = !selected && isTypeFull; // NEW

              const colorClass = seat.status === 'sold'
                ? STATUS_CLASSES.sold
                : selected
                  ? STATUS_CLASSES.selected
                : blocked
                  ? STATUS_CLASSES.capped // NEW branch
                  : STATUS_CLASSES[row.type];

              return (
                <button
                  key={seat.id}
                  type="button"
                  disabled={seat.status === 'sold' || blocked} // CHANGED
                  onClick={() =>
                    onToggleSeat({
                      id: seat.id,
                      row: row.label,
                      number: seat.number,
                      type: row.type,
                      price, // CHANGED — was row.price
                    })
                  }
                  className={`w-8 h-8 rounded ${colorClass} transition-colors`}
                  aria-label={`${row.label} seat ${seat.number} - ${seat.status}`}
                />
              );
            })}
          </div>
        </div>
        );
        })}
    </div>
  );
}