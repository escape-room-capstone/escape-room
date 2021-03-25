const fs = require('fs');
const path = require('path');

// Create array of image path names from passed in directory
const ImgPath = (dir) => {
    // get info on the images stores in the directory
    let fileNames = fs.readdirSync(dir);
    let dirLen = fs.readdirSync(dir).length;
    let filePublicDir = dir.slice(dir.indexOf('public') + ('public').length);
    
    // Assign image paths to new array and return it
    const ImgArr = new Array(dirLen);
    for (let i = 0; i < dirLen; i++) {
        ImgArr[i] = path.join(filePublicDir, fileNames[i])
    }
    return ImgArr;
}

module.exports = ImgPath;