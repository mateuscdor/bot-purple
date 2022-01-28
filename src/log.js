import { getCurrentTimeNoSecs } from "./getCurrentTimeNoSecs";
//==============================================================================
//logger function with timestamp
export function log(input, ...args) {
    let time = getCurrentTimeNoSecs();
    console.log(`[${time}] ${input} ${args}`);
}
