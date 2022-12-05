const fs = require("fs")

async function getCommands(){
    var file = fs.readFileSync("./commands.txt").toString()
    file = file.split("\r\n")
    var out = []
    for (var a of file){
        var e = a.split(" ")
        out.push({
            itemAmount: Number(e[1]),
            rowFrom: Number(e[3]),
            rowTo: Number(e[5]),
        })
    }
    // console.log(out)
    return out
}

// Not working?
async function getRow(){
    var file = fs.readFileSync("./rows.txt").toString()
    file = file.split("\r\n")
    file.pop() // Used to remove the numbers at the bottem
    // console.log(file)
    var help = {}
    for (var a in file){
        help[a] = {
            count: 0,
            out: {}
        }
        var row = file[a]
        // console.log(row)
        row = row.split("] [")
        
        
        for (var letter of row){
            help[a].count += 1
            letter = letter.replace("[", "")
            letter = letter.replace("]", "")
            // console.log(a, letter)
            help[a].out[help[a].count] = letter
        }
    }
    // console.log(help)
    var out = {}
    for (var a in help){
        for (e in help[a].out){
            if (!out[e]) out[e] = []
            // console.log(e, help[a].out[e])
            if (help[a].out[e] != " ") out[e].push(help[a].out[e])
        }
    }
    // console.log(out)
    return out
}

// Working
function move(rowsInput, input) {
    // console.log("Move!",rowsInput, input)
	//BC js arrays moment lol!!!
	input.rowFrom += -1;
	input.rowTo += -1;
    if (rowsInput[input.rowFrom] && rowsInput[input.rowTo]) {
    var rowData = rowsInput[input.rowFrom];
    //console.log(`Found rows ${inputs.rowFrom + 1} -> ${inputs.rowTo + 1}`)
    if (rowData.length >= input.itemAmount) {
      //console.log(`${inputs.rowFrom + 1} has enough items (${inputs.itemAmount}/${rowData.length})`)

      for (var i = 0; i < input.itemAmount; i++) {
        //console.log(rows)
        rowsInput[input.rowTo].unshift(rowsInput[input.rowFrom].shift());
      }
    }
  } else {
    console.log("fail!")
  }
  return rowsInput;
}

function move2(rowsInput, input) {
    // console.log("Move!",rowsInput, input)
	//BC js arrays moment lol!!!
	input.rowFrom += -1;
	input.rowTo += -1;
    if (rowsInput[input.rowFrom] && rowsInput[input.rowTo]) {
    var rowData = rowsInput[input.rowFrom];
    //console.log(`Found rows ${inputs.rowFrom + 1} -> ${inputs.rowTo + 1}`)
    if (rowData.length >= input.itemAmount) {
      //console.log(`${inputs.rowFrom + 1} has enough items (${inputs.itemAmount}/${rowData.length})`)

      var addTo = []
      for (var i = 0; i < input.itemAmount; i++) {
        a = rowsInput[input.rowFrom].shift() // Get the first elm in the array
        // console.log(i, a)
        addTo.push(a) // Put it in the first slot
      }
      // console.log(addTo, rowsInput[input.rowTo])
      rowsInput[input.rowTo] = [...addTo, ...rowsInput[input.rowTo]]
      // console.log(rowsInput[input.rowTo])
    }
  } else {
    console.log("fail!")
  }
  return rowsInput;
}

// Working
async function getAnswer(row){
    var out = ""
    for (var a in row) {
        a = row[a]
        if (a[0]) out += a[0]
    }
    return out
}

async function rowPrase(row){
    var out = []
    for (var a in row){
        out.push(row[a])
    }
    return out
}

module.exports = {
    getCommands,
    getRow,
    move,
    getAnswer,
    rowPrase,
    move2
}