import React from 'react';
import electricDreamsBanner from '../assets/electric_dreams_banner.jpg';
import techSummitBanner from '../assets/tech_summit_banner.jpg';
import culinaryExpoBanner from '../assets/culinary_expo_banner.jpg';

const imageMap = {
  'electric_dreams_banner.jpg': electricDreamsBanner,
  'tech_summit_banner.jpg': techSummitBanner,
  'culinary_expo_banner.jpg': culinaryExpoBanner
};

const EventBanner = ({ bannerImage, title }) => {
  const imageSrc = imageMap[bannerImage] || electricDreamsBanner;

  return (
    <div className="banner-wrapper">
      <img
        src={imageSrc}
        alt={title}
        className="event-banner-img"
      />
      <div className="banner-overlay"></div>
    </div>
  );
};

export default EventBanner;
