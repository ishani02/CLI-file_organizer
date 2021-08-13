function help(){
    console.log(`\nList of all the commands 
    👉 node main.js view "directoryPath" flat
    👉 node main.js view "directoryPath" tree
    👉 node main.js organize "directoryPath"
    👉 node main.js help`)
}

module.exports={
    helpFn:help
}