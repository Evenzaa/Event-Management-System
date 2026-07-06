import React from "react";

const EventGallery = ({ galleryImages }) => {
  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <div className="event-gallery-section mt-4 mb-3">
      <h5 className="fw-bold text-dark mb-3">Event Gallery</h5>

      <div className="row g-3">
        {galleryImages.map((image, index) => (
          <div key={index} className="col-4">
            <div className="gallery-img-wrapper overflow-hidden rounded-3 shadow-sm">
              <img
                src={image}
                alt={`Event ${index + 1}`}
                className="w-100 h-100 object-fit-cover gallery-img"
                style={{ aspectRatio: "4/3", minHeight: "120px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGallery;