//only time no seconds HH-MM
export function getCurrentTimeNoSecs(): string {
  let currentTimestamp = Date.now();

  // new Date object
  let date_ob = new Date(currentTimestamp);

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();
  return `${hours}:${minutes}`;
}
