//get date only YYYY-MM-DD
function getCurrentDate() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    var year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
}
