import electricDreamsBanner from '../../../assets/electric_dreams_banner.jpg';
import techSummitBanner from '../../../assets/tech_summit_banner.jpg';
import culinaryExpoBanner from '../../../assets/culinary_expo_banner.jpg';

const imageMap = {
  'electric_dreams_banner.jpg': electricDreamsBanner,
  'tech_summit_banner.jpg': techSummitBanner,
  'culinary_expo_banner.jpg': culinaryExpoBanner
};

export default function EventBanner({ bannerImage, title }) {
  const imageSrc = imageMap[bannerImage] || electricDreamsBanner;

  return (
    <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
    </div>
  );
}
