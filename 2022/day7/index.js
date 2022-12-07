const fs = require("fs")

// My custom database already handles the . path system so Im gonna relie on that :D
const dbClass = require("@airplanegobrr/database")
const db = new dbClass()
const db2 = new dbClass("database2.json") // stfu

async function getSizeOfDir(dir, path){
    var dirSizes = {}
    var size = 0

    for (var a in dir){
        const type = typeof(dir[a])
        if (type == "string") {
            size += Number(dir[a])
        } else if (type == "object"){
            path += `${a}.`
            const back = await getSizeOfDir(dir[a], path)
            console.log(back)
        }
    }
    return { size, dirSizes, path }
}

async function main(){
    const fileRaw = fs.readFileSync("input.txt").toString().split("\r\n")
    console.log(fileRaw)

    var filePath = []
    var files = {}

    for (var thing of fileRaw){
        continue
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
    console.log(await getSizeOfDir(data), "")
}
main()