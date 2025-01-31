import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  // Function to calculate time remaining until midnight
  function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
    const difference = midnight - now;

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up timer on component unmount
  }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max w-full">
      <div className="flex flex-col p-2 bg-red-500 rounded-box text-neutral-content">
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": timeLeft.hours }}></span>
        </span>
        hrs
      </div>
      <div className="flex flex-col p-2 bg-red-500 rounded-box text-neutral-content">
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": timeLeft.minutes }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-red-500 rounded-box text-neutral-content">
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
