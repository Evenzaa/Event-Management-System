import React from 'react';

const getBadgeClass = (tag) => {
  const normalized = tag.toLowerCase();
  if (normalized.includes('music') || normalized.includes('festival')) {
    return 'badge-purple';
  }
  if (normalized.includes('featured')) {
    return 'badge-green';
  }
  if (normalized.includes('tech') || normalized.includes('summit')) {
    return 'badge-blue';
  }
  if (normalized.includes('food') || normalized.includes('expo') || normalized.includes('drink')) {
    return 'badge-orange';
  }
  return 'badge-secondary';
};

const formatDate = (dateStr) => {
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

const EventInfo = ({ title, tags, date, location, organizer }) => {
  return (
    <div className="event-info-section mb-4">
      {/* Badges */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {tags && tags.map((tag, idx) => (
          <span key={idx} className={`badge-pill ${getBadgeClass(tag)}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="fw-bold text-dark mb-3 tracking-tight" style={{ fontSize: '32px' }}>
        {title}
      </h1>

      {/* Info Rows */}
      <div className="event-meta-container d-flex flex-column flex-md-row gap-3 md-gap-4 mt-2">
        <div className="meta-item d-flex align-items-center gap-2">
          <i className="bi bi-calendar3 text-primary fs-6"></i>
          <span className="text-secondary small fw-medium">{formatDate(date)}</span>
        </div>
        <div className="meta-item d-flex align-items-center gap-2">
          <i className="bi bi-geo-alt text-primary fs-6"></i>
          <span className="text-secondary small fw-medium">{location}</span>
        </div>
        <div className="meta-item d-flex align-items-center gap-2">
          <i className="bi bi-person text-primary fs-6"></i>
          <span className="text-secondary small fw-medium">
            Organized by <span className="text-dark fw-semibold">{organizer}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
