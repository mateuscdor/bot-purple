//get date only YYYY-MM-DD
function getCurrentDate(): string {
  let currentTimestamp = Date.now();

  // new Date object
  let date_ob = new Date(currentTimestamp);

  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  return `${year}-${month}-${date}`;
}
