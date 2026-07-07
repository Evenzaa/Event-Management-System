import React from 'react';

const AboutSection = ({ content }) => {
  const paragraphs = content ? content.split('\n\n') : [];

  return (
    <div className="about-section mt-4 mb-4">
      <h5 className="fw-bold text-dark mb-3" style={{ fontSize: '20px' }}>About This Event</h5>
      {paragraphs.map((p, idx) => (
        <p key={idx} className="text-secondary mb-3 leading-relaxed" style={{ fontSize: '15px', color: '#475569' }}>
          {p}
        </p>
      ))}
    </div>
  );
};

export default AboutSection;
