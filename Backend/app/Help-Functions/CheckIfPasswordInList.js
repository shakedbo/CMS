const lineReader = require("line-reader");
module.exports = (sPassword) => {
    lineReader.eachLine("../Media/password-list.txt", (line) => {
        if (sPassword === line) {
            console.log("true")
            return true;
        }
    })
    return false;
}

