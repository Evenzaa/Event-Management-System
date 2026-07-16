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
    <div className="flex flex-col overflow-hidden rounded-[16px] bg-[#FFFFFF] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]">
      
      {/* Image Section */}
      <div className="relative h-[160px] bg-[#e5e7eb]">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full object-cover" style={{ background: gradient }} />
        )}

        {/* Remove Favorite Button */}
        <button
          className="absolute left-[12px] top-[12px] flex cursor-pointer items-center gap-[6px] rounded-full border border-[#f3f4f6] bg-[rgba(255,255,255,0.95)] px-[12px] py-[6px] text-[13px] font-semibold text-[#EF4444] transition-all duration-[250ms] ease-[ease] hover:scale-105 hover:bg-[#EF4444] hover:text-white"
          aria-label="Remove from favorites"
          onClick={() => onRemoveFavorite(eventId)}
        >
          <Heart size={15} fill="currentColor" strokeWidth={2} />
          <span>Remove</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex grow flex-col p-[16px]">
        <h3 className="mb-[4px] text-[16px] font-bold">{title}</h3>
        <p className="mb-[16px] text-[12px] text-[#6B7280]">
          {date} · {location}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#793EED]">{price}</span>

          {/* Book Button */}
          <button
            className="cursor-pointer rounded-[20px] bg-gradient-to-r from-[#793EED] to-[#3E7FF6] px-[24px] py-[8px] text-[14px] font-medium text-[#FFFFFF] transition-opacity duration-200 ease-[ease] hover:opacity-80 border-none"
            onClick={() => navigate(`/event-details?id=${eventId}`)}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
