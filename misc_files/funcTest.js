function getCurrentTimeNoSecs() {
    var currentTimestamp = Date.now();
    // new Date object
    var date_ob = new Date(currentTimestamp);
    // current hours
    var hours = date_ob.getHours();
    // current minutes
    var minutes = date_ob.getMinutes();
    return "".concat(hours, ":").concat(minutes);
}
function log(input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var time = getCurrentTimeNoSecs();
    console.log("[".concat(time, "] ").concat(input, " ").concat(args));
}
function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function variableMessage() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var messageAmount = args.length;
    var rand = between(0, messageAmount - 1); // randomically choose a msg index
    return "".concat(args[rand], " rand value: ").concat(rand);
}
log(variableMessage("le penis", 'ajdhawjhad', 'dlkajdklawakdawkd', 4, 6, true, false));
