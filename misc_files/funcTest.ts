function getCurrentTimeNoSecs(): string {  
    let currentTimestamp = Date.now();


    // new Date object
    let date_ob = new Date(currentTimestamp);
    
    // current hours
    let hours = date_ob.getHours();
    
    // current minutes
    let minutes = date_ob.getMinutes();
    return `${hours}:${minutes}`
  }

function log(input, ...args) {
    let time = getCurrentTimeNoSecs()
    console.log(`[${time}] ${input} ${args}`)
}

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }





function variableMessage(...args: any) {
    let messageAmount = args.length
    let rand = between(0, messageAmount-1) // randomically choose a msg index
    return `${args[rand]} rand value: ${rand}`
}

log(variableMessage("le penis", 'ajdhawjhad', 'dlkajdklawakdawkd', 4, 6, true, false))