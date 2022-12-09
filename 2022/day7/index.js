const fs = require("fs")

// My custom database already handles the . path system so Im gonna relie on that :D
const dbClass = require("@airplanegobrr/database")
const db = new dbClass()
const db2 = new dbClass("database2.json") // stfu

var val = 0

async function getSizeOfDir(dir){
    var size = 0

    for (var a in dir){
        const type = typeof(dir[a])
        if (type == "string") {
            var s = Number(dir[a])
            size += s;
        } else if (type == "object"){
            console.log(`- Running ${a}`)
            var numBack = await getSizeOfDir(dir[a])
            size += numBack
            console.log("NumBack",numBack,a)
        }
    }
    if (size && size < 100000) {
        // console.log(size)
        console.log("Out", size)
        return Number(size);
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

    db.data = {}
    await db.save()

    var filePath = []
    var files = {}

    for (var thing of fileRaw){
        // console.log(thing)
        if (thing.startsWith("$")){
            var command = thing.replace("$ ", "")
            console.log("command",command)
            if (command == "ls") {
                continue
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
                continue
            }
        } else {
            if (thing.startsWith("dir ")){
                var filePathDots = filePath.join(".")
                await db.set(filePathDots, {})
                continue
            } else {
                // files[filePath][thing.split(" ")[0]] = thing.split(" ")[1]
                var filePathDots = filePath.join(".")
                // console.log(filePath, filePathDots, deepFind(files, filePathDots))
                var file = thing.replace(".", "_").split(" ")

                await db.set(filePathDots+`.${file[1]}`, file[0])
                continue
            }
        }
    }
    var sizes = {}
    var a = []
    var data = db.data
    await db.save()
    // console.log(data)
    var back = await getSizeOfDir(data)
    console.log(back)
}
main()