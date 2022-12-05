// 1 for Rock
// 2 for Paper
// 3 for Scissors

// 0 if you lost
// 3 if the round was a draw
// 6 if you won

// A for Rock, B for Paper, and C for Scissors.
// X for Rock, Y for Paper, and Z for Scissors.

const fs = require("fs")
var file = fs.readFileSync("input.txt").toString().split("\r\n")
var score = 0

const scoreCal = {
    X: "R",
    Y: "P",
    Z: "S",

    A: "R",
    B: "P",
    C: "S",

    R: 1,
    P: 2,
    S: 3
}

var wins = 0
var draws = 0
for (var a of file){
    var picks = a.split(" ")
    //console.log(scoreCal[picks[0]], scoreCal[picks[1]])
    var oppType = scoreCal[picks[0]]
    var meType = scoreCal[picks[1]]

    if (meType === oppType) {
        score += 3 + scoreCal[meType]
    } else if (meType === 'R') {
        if (oppType === 'P') {
            score += 0 + scoreCal[meType]
        } else {
            score += 6 + scoreCal[meType]
        }
    } else if (meType === 'P') {
        if (oppType === 'S') {
            score += 0 + scoreCal[meType]
        } else {
            score += 6 + scoreCal[meType]
        }
    } else if (meType === 'S') {
        if (oppType === 'R') {
            score += 0 + scoreCal[meType]
        } else {
            score += 6 + scoreCal[meType]
        }
    }
}
console.log(score)