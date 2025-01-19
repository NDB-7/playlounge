// Formats to HH:MM (AM/PM)
export default function formatTime(ms: number) {
  const date = new Date(ms);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${amPm}`;
}
