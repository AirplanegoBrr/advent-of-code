const fs = require("fs")
const fileString = fs.readFileSync("input.txt").toString().split("\r\n")
// console.log(fileString)

function ord(str){return str.charCodeAt(0);}

var value = 0

async function thing(wholeString){
    var split = wholeString.split("")

    var count = 0
    var one = []
    var two = []
    for (var a of split) {
        count ++
        if (count > split.length / 2) {
            one.push(a)
        } else {
            two.push(a)
        }
    }
    // console.log(one,two)
    var done = []
    var letters = []
    for (var a of one){
        if (two.includes(a)) {
            if (!done.includes(one.join(""))) {
                // console.log(one.join(""),a)
                letters.push(a)
            }
            done.push(one.join(""))
            continue
        }
    }

    for (var let of letters){
        if (let == let.toUpperCase()){
            value += ord(let)-38
        } else {
            value += ord(let)-96
        }
    }
}
for (var a of fileString){
    thing(a)
}
console.log(value)

// thing("vJrwpWtwJgWrhcsFMMfFFhFp")