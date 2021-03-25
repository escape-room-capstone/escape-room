const path = require('path');
const ImgPath = require('../../../src/programs/ImgPath');

// Define directory name and assign results of calling ImgPath helper to new array
let IslandGameDir = path.join(__dirname, './IslandGame');
let SpaceGameDir = path.join(__dirname, './SpaceGame');

const IslandGameImg = ImgPath(IslandGameDir);
const SpaceGameImg = ImgPath(SpaceGameDir)

module.exports = {
    IslandGameImg,
    SpaceGameImg
}



// *** NOTES *** 
// - can automate further by reading the contents of GameImages dir and looping (forEach) over the sub-directories 
// to map out the variables for each subdirectory (https://stackoverflow.com/questions/8260156/how-do-i-create-dynamic-variable-names-inside-a-loop)