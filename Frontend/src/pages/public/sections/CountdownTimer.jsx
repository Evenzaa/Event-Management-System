import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }) {
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

  if (hasStarted) {
    return (
      <div className="my-8 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 font-semibold">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>This event has already started!</span>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h6 className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-4">
        Event starts in
      </h6>
      <div className="flex gap-3 md:gap-4">
        {/* Days - Primary style */}
        <div className="w-20 h-24 md:w-24 md:h-28 bg-blue-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-sm">
          <span className="text-3xl md:text-4xl font-bold tracking-tight">{padZero(timeLeft.days)}</span>
          <span className="text-xs md:text-sm font-medium text-blue-100 mt-1">Days</span>
        </div>

        {/* Hours - Secondary style */}
        <div className="w-20 h-24 md:w-24 md:h-28 bg-violet-100 rounded-2xl flex flex-col items-center justify-center text-violet-600 shadow-sm">
          <span className="text-3xl md:text-4xl font-bold tracking-tight">{padZero(timeLeft.hours)}</span>
          <span className="text-xs md:text-sm font-medium opacity-80 mt-1">Hours</span>
        </div>

        {/* Mins - Secondary style */}
        <div className="w-20 h-24 md:w-24 md:h-28 bg-violet-100 rounded-2xl flex flex-col items-center justify-center text-violet-600 shadow-sm">
          <span className="text-3xl md:text-4xl font-bold tracking-tight">{padZero(timeLeft.minutes)}</span>
          <span className="text-xs md:text-sm font-medium opacity-80 mt-1">Mins</span>
        </div>

        {/* Secs - Secondary style */}
        <div className="w-20 h-24 md:w-24 md:h-28 bg-violet-100 rounded-2xl flex flex-col items-center justify-center text-violet-600 shadow-sm">
          <span className="text-3xl md:text-4xl font-bold tracking-tight">{padZero(timeLeft.seconds)}</span>
          <span className="text-xs md:text-sm font-medium opacity-80 mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}
