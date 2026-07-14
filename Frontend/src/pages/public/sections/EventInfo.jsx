import Badge from '../../../components/common/Badge';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const dateObj = new Date(dateStr);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
  if (normalized.includes('music') || normalized.includes('festival')) return 'music';
  if (normalized.includes('tech') || normalized.includes('summit')) return 'technology';
  if (normalized.includes('food') || normalized.includes('expo')) return 'food';
  if (normalized.includes('art')) return 'art';
  if (normalized.includes('sport')) return 'sports';
  if (normalized.includes('education')) return 'education';
  if (normalized.includes('business')) return 'business';
  if (normalized.includes('featured')) return 'emerald'; // using emerald tone indirectly if possible, wait Badge only has specific tones. Let's fallback to violet or pink. Wait, emerald is comedy in Badge. Let's just use comedy for featured if we want green. Or we can just use the exact ones.
  return 'violet';
};

export default function EventInfo({ title, tags, date, location, organizer }) {
  return (
    <div className="mb-8">
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, idx) => {
           let tone = getToneForTag(tag);
           if (tag.toLowerCase() === 'featured') {
             // Badge has no 'green' but 'comedy'/'education' maps to emerald (green)
             tone = 'education';
           }
           return (
             <Badge key={idx} tone={tone}>
               {tag}
             </Badge>
           );
        })}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        {title}
      </h1>

      {/* Info Rows */}
      <div className="flex flex-col md:flex-row flex-wrap md:items-center gap-4 md:gap-6 text-sm text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>
            Organized by <span className="text-slate-900 font-semibold">{organizer}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
