const { writeFileSync } = require("fs")

async function part1(){
	var start = new Date().valueOf()
	const tool = require("./inputPrase")
	const commands = await tool.getCommands()
	// console.log(commands)
	var row = await tool.getRow()
	row = await tool.rowPrase(row)
	for (var a of commands) {
		// console.log(a, row)
		row = await tool.move(row, a)
	}
	console.log(`DONE!`, row)
	var out = await tool.getAnswer(row)
	var end = new Date().valueOf()
	console.log(`Part1\nTime: ${end-start}\nAnwser: ${out}`)
	writeFileSync("output.json", JSON.stringify(row))
}

async function part2(){
	var start = new Date().valueOf()
	const tool = require("./inputPrase")
	const commands = await tool.getCommands()
	// console.log(commands)
	var row = await tool.getRow()
	row = await tool.rowPrase(row)
	for (var a of commands) {
		// console.log(a, row)
		row = await tool.move2(row, a)
	}
	console.log(`DONE!`, row)
	var out = await tool.getAnswer(row)
	var end = new Date().valueOf()
	console.log(`Part2\nTime: ${end-start}\nAnwser: ${out}`)
	writeFileSync("output2.json", JSON.stringify(row))
}
part1()
part2()