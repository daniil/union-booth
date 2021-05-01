export function formatDate(timestamp, withYear = false) {
  const dateObj = new Date(timestamp);
  const dateFormat = {
    month: 'short',
    day: 'numeric',
  };

  if (withYear) {
    dateFormat.year = 'numeric';
  }

  return dateObj.toLocaleDateString('en-CA', dateFormat);
}

export function formatTime(timestamp) {
  const dateObj = new Date(timestamp);

  return dateObj.toLocaleTimeString('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
}