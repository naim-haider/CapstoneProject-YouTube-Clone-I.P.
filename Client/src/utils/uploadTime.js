export function getTimeDuration(uploadDate) {
  const uploadTime = new Date(uploadDate); // Convert the uploaded time to a Date object
  const currentTime = new Date(); // Get the current date and time
  const durationInMilliseconds = currentTime - uploadTime; // Difference in milliseconds
  const hours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

  if (hours < 24) {
    // If the duration is less than 24 hours, return in hours
    return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? "s" : ""} ago`;
  } else {
    // If the duration is more than 24 hours, return in days
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}
// console.log(getTimeDuration(video.uploadDate));
//=== setting upload time ends here ===//
