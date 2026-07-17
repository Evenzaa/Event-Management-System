import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatPrice, formatDateLabel } from "../../utils/formatters";

const STATUS_TONE = {
  upcoming: "violet",
  past: "music",
  cancelled: "pink",
};

const STATUS_LABEL = {
  upcoming: "Upcoming",
  past: "Past",
  cancelled: "Cancelled",
};

export default function BookingCard({
  booking,
  onCancel,
  onLeaveReview,
}) {
  const {
    _id,
    eventId,
    tickets,
    ticketNumber,
    totalPrice,
    status,
  } = booking;

  const eventTitle = eventId?.title;
  const eventImage = eventId?.images?.[0];
  const date = eventId?.date;
  const venue = eventId?.location;

  // Total number of tickets
  const quantity = tickets.reduce(
    (total, ticket) => total + ticket.quantity,
    0
  );

  // Example: "1× VIP, 2× General"
  const ticketType = tickets
    .map(
      (ticket) =>
        `${ticket.quantity}× ${
          ticket.ticketType.charAt(0).toUpperCase() +
          ticket.ticketType.slice(1)
        }`
    )
    .join(", ");

  // Determine display status
  let displayStatus;

  if (status === "cancelled") {
    displayStatus = "cancelled";
  } else {
    displayStatus =
      new Date(date) > new Date() ? "upcoming" : "past";
  }

  return (
    <article className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        src={eventImage}
        alt={eventTitle}
        className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-28"
        loading="lazy"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 font-semibold text-slate-900">
            {eventTitle}
          </h3>

          <Badge
            tone={STATUS_TONE[displayStatus]}
            className="shrink-0"
          >
            {STATUS_LABEL[displayStatus]}
          </Badge>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {formatDateLabel(date)} &middot; {venue}
        </p>

        <p className="text-sm text-slate-500">
          {ticketType} &middot; Ticket No: {ticketNumber}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline">
            View Ticket
          </Button>

          {displayStatus === "upcoming" && (
            <Button
              size="sm"
              variant="ghost"
              className="!bg-red-50 !text-red-600 hover:!bg-red-100"
              onClick={() => onCancel?.(_id)}
            >
              Cancel
            </Button>
          )}

          {displayStatus === "past" && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onLeaveReview?.(_id)}
            >
              Leave Review
            </Button>
          )}
        </div>
      </div>

      <p className="text-right text-lg font-bold text-violet-600 sm:ml-4">
        {formatPrice(totalPrice)}
      </p>
    </article>
  );
}