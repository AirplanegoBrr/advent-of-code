const fs = require("fs")
var file = fs.readFileSync("input.txt").toString().split("\r\n")
async function run() {
    var out = { count: 0, output: {} }
    for (var a of file){
        if (a != "") {
            if (!out.output[out.count]) out.output[out.count] = 0
            out.output[out.count] += Number(a)
        } else {
            console.log("Next!")
            out.count += 1
        }
    }

    var allNumbers = []
    for (var a in out.output){
        allNumbers.push(out.output[a])
    }
    allNumbers = allNumbers.sort((a, b) => b - a)
    console.log(`Biggest: ${allNumbers[0]}, Top 3 combine: ${allNumbers[0]+allNumbers[1]+allNumbers[2]}`)
}
run()