import Badge from '../../../components/common/Badge';
import { useNavigate } from 'react-router-dom';
import { addFavorite } from '../../../services/api';

const formatDate = (dateStr) => {
  if (!dateStr) return '';

  const dateObj = new Date(dateStr);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const timeStr = `${hours}:${minutes} ${ampm}`;

  return `${formattedDate} - ${timeStr}`;
};


const getToneForTag = (tag) => {
  const normalized = tag.toLowerCase();

  if (normalized.includes('music') || normalized.includes('festival'))
    return 'music';

  if (normalized.includes('tech') || normalized.includes('summit'))
    return 'technology';

  if (normalized.includes('food') || normalized.includes('expo'))
    return 'food';

  if (normalized.includes('art'))
    return 'art';

  if (normalized.includes('sport'))
    return 'sports';

  if (normalized.includes('education'))
    return 'education';

  if (normalized.includes('business'))
    return 'business';

  if (normalized.includes('featured'))
    return 'education';

  return 'violet';
};


export default function EventInfo({
  eventId,
  title,
  tags,
  date,
  location,
  organizer
}) {

  const navigate = useNavigate();


  const handleAddFavorite = async () => {
    try {
      await addFavorite(eventId);
      navigate('/favorites');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="mb-8">


      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, idx) => (
          <Badge 
            key={idx}
            tone={getToneForTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>



      {/* Title + Favorite Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>

        <button
          onClick={handleAddFavorite}
          className="
            flex items-center justify-center gap-2
            px-5 py-2.5
            rounded-xl
            border border-violet-600
            text-violet-600
            font-semibold
            hover:bg-violet-600
            hover:text-white
            transition-all duration-300
            whitespace-nowrap
          "
        >
          ❤️ Add to Favorites
        </button>

      </div>




      {/* Info Rows */}
      <div className="flex flex-col md:flex-row flex-wrap md:items-center gap-4 md:gap-6 text-sm text-slate-600 font-medium">


        {/* Date */}
        <div className="flex items-center gap-2">

          <svg
            className="w-5 h-5 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <span>{formatDate(date)}</span>

        </div>



        {/* Location */}
        <div className="flex items-center gap-2">

          <svg
            className="w-5 h-5 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />

          </svg>

          <span>{location}</span>

        </div>



        {/* Organizer */}
        <div className="flex items-center gap-2">

          <svg
            className="w-5 h-5 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />

          </svg>


          <span>
            Organized by{' '}
            <span className="text-slate-900 font-semibold">
              {organizer}
            </span>
          </span>

        </div>


      </div>


    </div>
  );
}