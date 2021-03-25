const Sequelize = require('sequelize')
const db = require('../db')

// DynamicGame parent model
const DynamicGame = db.define('dg', {
    title: {
        type: Sequelize.STRING,
    }
})


// Level model for DynamicGame
const Level = db.define('level', {
    name: {
        type: Sequelize.STRING,
    },
    isOpen: {
        type: Sequelize.BOOLEAN,
    },
    solved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})


// Room model for DynamicGame
const roomTypes = [
    'singleRoom',
    'lobbyRoom',
    'landingPage',
    'victoryPage'
];

const DynamicRoom = db.define('room', {
    name: {
        type: Sequelize.STRING,
    },
    roomType: {
        type: Sequelize.ENUM,
        values: roomTypes
    },
    isOpen: {
        type: Sequelize.BOOLEAN
    },
    prevRoom: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    nextRooms: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    solved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})


// Image model for DynamicGame
const imageTypes = [
    'background',
    'other'
];

const Image = db.define('image', {
    name: {
        type: Sequelize.STRING,
    },
    imgType: {
        type: Sequelize.ENUM,
        values: imageTypes
    },
    src: {
        type: Sequelize.STRING
    }
})



// DynamicGame model associations
DynamicGame.hasMany(DynamicRoom);
DynamicGame.hasMany(Level);
DynamicGame.hasMany(Image);
DynamicRoom.hasMany(Image);
DynamicRoom.belongsTo(Level);
Level.belongsTo(DynamicGame);


module.exports = {
    models: {
        DynamicGame,
        Level,
        DynamicRoom,
        Image
    },
    modelConst: {
        roomTypes,
        imageTypes
    }
}