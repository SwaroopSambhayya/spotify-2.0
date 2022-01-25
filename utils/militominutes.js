export default function msToHMS(ms) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  seconds = Math.round(seconds);
  if (hours > 0) {
    return (
      hours.toString() + ":" + minutes.toString() + ":" + seconds.toString()
    );
  } else {
    return (
      (minutes < 10 ? "0" + minutes.toString() : minutes.toString()) +
      ":" +
      (seconds.toString() < 10 ? "0" + seconds.toString() : seconds.toString())
    );
  }
}
