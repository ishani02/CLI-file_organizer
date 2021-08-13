let fs = require("fs");
let path = require("path");
let treeStr = "";

function treeHelper(inpPath, command) {//calls function according to user's input
  if (command == "tree") {
    tree(inpPath, treeStr);
  } else if (command == "flat") {
    flatView(inpPath);
  } else {
    console.log("Wrong command ❌ Please enter a valid command!!");
  }
}

function isFile(inpPath) { //To check if the path is of a file or not
  if (fs.lstatSync(inpPath).isFile()) {
    return true;
  } else {
    return false;
  }
}

function flatView(inpPath) {//To show path of files and directories present in given directory
  if (isFile(inpPath) == true) {
    console.log(inpPath + "*");
  } else {
    console.log(inpPath);
    let contentArr = fs.readdirSync(inpPath);
    for (i in contentArr) {
      let newPath = path.join(inpPath, contentArr[i]);
      flatView(newPath);
    }
  }
}

function tree(inpPath, indent) {//To display names of the content present in given directory in the form of a tree
  if (inpPath == undefined) {
    inpPath = process.cwd();
  }
  let parentFolderName = path.basename(inpPath);
  let type = isFile(inpPath);
  if (type) {
    console.log(indent + "└──" + parentFolderName);
  } else {
    console.log(indent + "├──" + parentFolderName);
    let contentArr = fs.readdirSync(inpPath);
    for (let i = 0; i < contentArr.length; i++) {
      let content = contentArr[i];
      let fPath = path.join(inpPath, content);

      tree(fPath, indent + "\t");
    }
  }
}

module.exports = {
  treeFn: treeHelper
};
