import { useEffect, useState } from "react";

export default function TurnCountdown({ duration }: { duration: number }) {
  const [timeLeft, setTimeLeft] = useState(duration); // Time left in seconds
  const radius = 12; // Radius of the circle
  const strokeWidth = 12; // Width of the circle stroke
  const normalizedRadius = radius - strokeWidth / 2; // Radius for the SVG path
  const circumference = 2 * Math.PI * normalizedRadius; // Total circumference of the circle

  // Calculate the stroke-dasharray value based on the time left
  const strokeDashoffset =
    circumference - (timeLeft / duration) * circumference;

  useEffect(() => {
    setTimeLeft(duration - 1);
    // Update the timer every 1 second
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  if (timeLeft > -1)
    return (
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90 opacity-85"
      >
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
        />
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={4}
          r={radius - 2}
          cx={radius}
          cy={radius}
        />
      </svg>
    );
}
