var rows = [["N", "Z"], ["D", "C", "M"], ["P"]];

function move(rowsInput, input) {
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
  }
  return rowsInput;
}

console.log(rows)
rows = move(rows, {
	itemAmount: 1,
	rowFrom: 2,
	rowTo: 1,
})
rows = move(rows, {
	itemAmount: 3,
	rowFrom: 1,
	rowTo: 3,
})
rows = move(rows, {
	itemAmount: 2,
	rowFrom: 2,
	rowTo: 1,
})
rows = move(rows, {
	itemAmount: 1,
	rowFrom: 1,
	rowTo: 2,
})
console.log(rows)