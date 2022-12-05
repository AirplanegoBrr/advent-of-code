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

var score1 = 0
var score2 = 0


function thing(oppType, meType){
    var score = 0
    if (meType === oppType) {
        score  += 3 + scoreCal[meType]
    } else if (meType === 'R') {
        if (oppType === 'P') {
            score  += 0 + scoreCal[meType]
        } else {
            score  += 6 + scoreCal[meType]
        }
    } else if (meType === 'P') {
        if (oppType === 'S') {
            score  += 0 + scoreCal[meType]
        } else {
            score  += 6 + scoreCal[meType]
        }
    } else if (meType === 'S') {
        if (oppType === 'R') {
            score  += 0 + scoreCal[meType]
        } else {
            score  += 6 + scoreCal[meType]
        }
    }
    return score
}

for (var a of file){
    var picks = a.split(" ")
    //console.log(scoreCal[picks[0]], scoreCal[picks[1]])
    var oppType = scoreCal[picks[0]]
    var meType = scoreCal[picks[1]]

    score1 += thing(oppType, meType)
}
console.log("Part1",score1 )

for (var a of file){
    var picks = a.split(" ")
    //console.log(scoreCal[picks[0]], scoreCal[picks[1]])
    var oppType = scoreCal[picks[0]]
    if (picks[1] == "Y") {
        // Draw
        score2 += thing(oppType,oppType)
    } else if (picks[1] == "Z") {
        // Win
        if (oppType == "R") {
            score2 += thing(oppType, "P")
        } else if (oppType == "P") {
            score2 += thing(oppType, "S")
        } else if (oppType == "S") {
            score2 += thing(oppType, "R")
        }
    } else if (picks[1] == "X") {
        // Lose
        if (oppType == "R") {
            score2 += thing(oppType, "S")
        } else if (oppType == "P") {
            score2 += thing(oppType, "R")
        } else if (oppType == "S") {
            score2 += thing(oppType, "P")
        }
    }
}
console.log("Part1",score2 )