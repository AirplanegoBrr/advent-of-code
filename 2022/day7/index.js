const fs = require("fs")

// My custom database already handles the . path system so Im gonna relie on that :D
const dbClass = require("@airplanegobrr/database")
const db = new dbClass()
const db2 = new dbClass("database2.json") // stfu

var val = 0

async function getSizeOfDir(dir, path){
    var size = 0

    for (var a in dir){
        const type = typeof(dir[a])
        if (type == "string") {
            var s = Number(dir[a])
            size += s;
        } else if (type == "object"){
            var size = await getSizeOfDir(dir[a], path)
            val += Number(size)
        }
    }
    if (size && size < 100000) {
        console.log(size)
        return size

        // val += size;
    } else {
        return 0
    }
}
// 1704740
// 2570369
// 3346673
// 25452855
// 27094788 ?????

async function main(){
    const fileRaw = fs.readFileSync("input.txt").toString().split("\r\n")
    console.log(fileRaw)

    var filePath = []
    var files = {}

    for (var thing of fileRaw){
        // console.log(thing)
        if (thing.startsWith("$")){
            var command = thing.replace("$ ", "")
            // console.log(command)
            if (command == "ls") {
                
            } else if (command.startsWith("cd")){
                var dir = command.replace("cd ", "")
                // console.log("DIR",dir)
                if (dir == ".."){
                    filePath.pop()
                } else if(dir == "/"){
                    filePath = []
                } else {
                    filePath.push(dir)
                }
            }
        } else {
            if (thing.startsWith("dir ")){
                var filePathDots = filePath.join(".")
                await db.set(filePathDots, {})
            } else {
                // files[filePath][thing.split(" ")[0]] = thing.split(" ")[1]
                var filePathDots = filePath.join(".")
                // console.log(filePath, filePathDots, deepFind(files, filePathDots))
                var file = thing.replace(".", "_").split(" ")

                await db.set(filePathDots+`.${file[1]}`, file[0])
            }
        }
    }
    var sizes = {}
    var a = []
    await db.load()
    var data = db.data
    console.log(data)
    await getSizeOfDir(data)
    console.log(val)
}
main()