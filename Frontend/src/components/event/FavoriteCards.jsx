import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function FavoriteCards({
  eventId,
  image,
  gradient,
  title,
  date,
  location,
  price,
  isFavorite = true,
  onRemoveFavorite,
}) {

  const navigate = useNavigate();

  return (
    <div className="event-card">
      
      {/* Image Section */}
      <div className="event-card-image-container">
        {image ? (
          <img src={image} alt={title} className="event-card-image" />
        ) : (
          <div className="event-card-image" style={{ background: gradient }} />
        )}

        {/* Remove Favorite Button */}
        <button
          className="event-card-favorite-btn"
          aria-label="Remove from favorites"
          onClick={() => onRemoveFavorite(eventId)}
        >
          <Heart size={15} fill="currentColor" strokeWidth={2} />
          <span>Remove</span>
        </button>
      </div>

      {/* Content */}
      <div className="event-card-content">
        <h3 className="event-card-title">{title}</h3>
        <p className="event-card-details">
          {date} · {location}
        </p>

        <div className="event-card-footer">
          <span className="event-card-price">{price}</span>

          {/* Book Button */}
          <button
            className="btn-primary"
            onClick={() => navigate(`/event-details?id=${eventId}`)}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
