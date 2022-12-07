const fs = require("fs")

const thinggyNumber = 14

async function checkContains(input){
    var split = input.split("")
    if (!(split.length == thinggyNumber)) return false
    return (new Set(split)).size !== split.length;
}

async function thing(wholeString){
    var allChars = wholeString.split("")
    var e = []
    var charCount = 0
    for (var char of allChars){
        e.push(char)
        charCount++
        if (e.length == thinggyNumber){
            var testString = e.join("")
            var isBad = await checkContains(testString)
            if (isBad) {
                e.shift()
            } else {
                console.log(charCount)
            }
        }
    }
}
thing("mjqjpqmgbljsphdztnvjfqwrcgsmlb")
thing("bvwbjplbgvbhsrlpgdmjqwftvncz")
thing("nppdvjthqldpwncqszvftbrmjlhg")
thing("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")
thing("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")
// 
const fileString = fs.readFileSync("input2.txt").toString()
thing(fileString)