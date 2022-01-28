const Fs = require("@supercharge/filesystem");
//==============================================================================
export function readFromFile(path) {
    return Fs.readFile(path, "utf8", (err, json) => {
        if (err) {
            console.error(err);
            throw err;
        }
        //const data = JSON.parse(json)
        //console.log(data)
    });
}
