import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (num) => String(num).padStart(2, '0');

  const hasStarted = +new Date(targetDate) - +new Date() <= 0;

  return (
    <div className="countdown-section my-4 py-2">
      <h6 className="text-muted fw-semibold small uppercase mb-3" style={{ fontSize: '13px', color: '#64748b' }}>
        Event starts in
      </h6>
      
      {hasStarted ? (
        <div className="alert alert-success d-flex align-items-center mb-0 gap-2 rounded-3 py-2 fw-semibold">
          <i className="bi bi-patch-check-fill fs-5"></i>
          <span>This event has already started!</span>
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-2 gap-sm-3">
          {/* Days - Dark Blue/Indigo block */}
          <div className="countdown-block-primary rounded-3 text-center d-flex flex-column justify-content-center">
            <span className="fs-3 fw-bold tracking-tight">{padZero(timeLeft.days)}</span>
            <span className="small-label opacity-75">Days</span>
          </div>

          {/* Hours - Light purple block */}
          <div className="countdown-block-secondary rounded-3 text-center d-flex flex-column justify-content-center">
            <span className="fs-3 fw-bold text-indigo">{padZero(timeLeft.hours)}</span>
            <span className="small-label text-indigo-muted">Hours</span>
          </div>

          {/* Mins - Light purple block */}
          <div className="countdown-block-secondary rounded-3 text-center d-flex flex-column justify-content-center">
            <span className="fs-3 fw-bold text-indigo">{padZero(timeLeft.minutes)}</span>
            <span className="small-label text-indigo-muted">Mins</span>
          </div>

          {/* Secs - Light purple block */}
          <div className="countdown-block-secondary rounded-3 text-center d-flex flex-column justify-content-center">
            <span className="fs-3 fw-bold text-indigo">{padZero(timeLeft.seconds)}</span>
            <span className="small-label text-indigo-muted">Secs</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
