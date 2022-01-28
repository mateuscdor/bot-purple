//only time HH-MM-SS
function getCurrentTime() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    // current seconds
    var seconds = date_ob.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
}
