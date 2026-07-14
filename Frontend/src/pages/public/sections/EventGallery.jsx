export default function EventGallery({ galleryImages }) {
  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <div className="mb-8">
      <h5 className="text-xl font-bold text-slate-900 mb-4">Event Gallery</h5>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-sm aspect-w-4 aspect-h-3">
            <img
              src={image}
              alt={`Event ${index + 1}`}
              className="w-full h-full object-cover min-h-[120px] transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
