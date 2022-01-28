"use strict";
exports.__esModule = true;
exports.getCurrentTimeNoSecs = void 0;
//only time no seconds HH-MM
function getCurrentTimeNoSecs() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    return hours + ":" + minutes;
}
exports.getCurrentTimeNoSecs = getCurrentTimeNoSecs;
