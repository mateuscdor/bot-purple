//only time HH-MM-SS
function getCurrentTime() {
    let currentTimestamp = Date.now();
    // new Date object
    let date_ob = new Date(currentTimestamp);
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}
