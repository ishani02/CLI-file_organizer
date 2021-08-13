//1. create a directory "organized" inside random folder
//2. check extension of each file in random folder 
//3. copy file to destination folder
let fs=require("fs");
let path=require("path");

let types={
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize(inpPath){
//create organized folder if it does not exist
let organizedFolderPath=path.join(inpPath,"organized");
if(fs.existsSync(organizedFolderPath)==false){
fs.mkdirSync(organizedFolderPath);
}

//read data of input folder
let srcContentArr=fs.readdirSync(inpPath);
for(let i=0;i<srcContentArr.length;i++){
    let content=srcContentArr[i];
    let fullOriginalPath=path.join(inpPath,content);
    if(fs.lstatSync(fullOriginalPath).isFile()==true){
        let folderName=checkExtTellFolder(fullOriginalPath);//to get destination folder name for current file
        copyFileToDestination(fullOriginalPath,folderName,organizedFolderPath);//copy file into destination folder
        fs.unlinkSync(fullOriginalPath);
    }
}
}

function checkExtTellFolder(fullPath){
    let fileName=path.extname(fullPath);
    let extension=fileName.split(".")[1];
    //console.log(extension);
    
    for(let type in types){
        if(types[type].includes(extension)){
          return type;  
        }
      }
   return "others"
}


function copyFileToDestination(fullOriginalPath,folderName,organizedFolderPath){
    let destFolderPath=path.join(organizedFolderPath,folderName);
    if(fs.existsSync(destFolderPath)==false){
        fs.mkdirSync(destFolderPath);
    }
    let fileName=path.basename(fullOriginalPath);
    let destFilePath=path.join(destFolderPath,fileName);
    fs.copyFileSync(fullOriginalPath,destFilePath);
    console.log(fileName+" copied to "+folderName);
}

module.exports={
    organizeFn:organize
}