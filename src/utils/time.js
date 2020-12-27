export function formatDate(timestamp) {
  const dateObj = new Date(timestamp);

  return dateObj.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric'
  });
}

export function formatTime(timestamp) {
  const dateObj = new Date(timestamp);

  return dateObj.toLocaleTimeString('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
}