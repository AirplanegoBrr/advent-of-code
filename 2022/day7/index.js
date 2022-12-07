const fs = require("fs")
async function main(){
    const fileRaw = fs.readFileSync("input.txt").toString().split("\r\n")
    console.log(fileRaw)
}
main()