let treeObj=require("./commands/view");
let helpObj=require("./commands/help");
let organizeObj=require("./commands/organize");

let inputArr=process.argv.slice(2);
let input=inputArr[0];
let inpPath=inputArr[1];

switch(input){
    case "view":
    treeObj.treeFn(inputArr[1],inputArr[2]);
    break;

    case "help":
    helpObj.helpFn();
    break;

    case "organize":
    organizeObj.organizeFn(inpPath);
    break;

    default:
    console.log("🙏 kindly enter the correct command");
    break;
}