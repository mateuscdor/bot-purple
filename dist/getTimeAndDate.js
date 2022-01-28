"use strict";
exports.__esModule = true;
exports.getTimeAndDate = void 0;
//==============================================================================
//time in YYYY-MM-DD HH:MM:SS
function getTimeAndDate() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // adjust 0 before single digit date
    var date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    var year = date_ob.getFullYear();
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    // current seconds
    var seconds = date_ob.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}
exports.getTimeAndDate = getTimeAndDate;
