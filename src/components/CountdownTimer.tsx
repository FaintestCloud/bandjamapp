import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: Date;
};

function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const next = calculateTimeLeft();
      setTimeLeft(next);
      if (!next) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="text-center">
        <span className="text-6xl md:text-8xl lg:text-[12rem] font-extrabold font-sans text-indigo-600">
          Jam Started 
        </span>
      </div>
    );
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex justify-center items-end gap-9 select-none">
      <div className="flex flex-col items-center">
        <span className="countdown-number">{pad(timeLeft.days)}</span>
        <span className="countdown-label">Days</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="countdown-number">{pad(timeLeft.hours)}</span>
        <span className="countdown-label">Hours</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="countdown-number">{pad(timeLeft.minutes)}</span>
        <span className="countdown-label">Minutes</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="countdown-seconds">{pad(timeLeft.seconds)}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
}

export default Countdown;