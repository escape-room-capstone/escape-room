// Imports
const db = require('../db/db');
const { models: { DynamicGame, Level, DynamicRoom, Image } } = require('../db/models/DynamicGameModels.js')
const { IslandGameImg, SpaceGameImg }  = require('../../public/Images/GameImages/index');


// Sync and seed test data

const dg_syncAndSeed = async () => {
    // Sync db 
    await db.sync({ force: true })

    //--

    // Create IslandGame seed data
    await DynamicGame.create({ title: 'IslandGame' });
    await DynamicGame.create({ title: 'BeachGame' });
     
    const IslandLevels = await Promise.all([
        Level.create({ name: 'landingPage', isOpen: true, dgId: 1 }),
        Level.create({ name: 'islandMap', isOpen: true, dgId: 1 }),
        Level.create({ name: 'crashSite', isOpen: true, dgId: 1 }),
        Level.create({ name: 'village', isOpen: true, dgId: 1 }),
        Level.create({ name: 'victory', isOpen: true, dgId: 1 }),
    ]);

    const IslandRooms = await Promise.all([
        DynamicRoom.create({
            // roomId = 1
            name: 'landingPage',
            roomType: 'landingPage',
            isOpen: true,
            nextRooms: [3],
            dgId: 1,
            levelId: 1
        }),
        DynamicRoom.create({
            // roomId = 2
            name: 'islandMap',
            roomtype: 'lobbyRoom',
            isOpen: true,
            prevRooms: [3, 4, 5],
            nextRooms: [3, 4, 5],
            dgId: 1,
            levelId: 2
        }),
        DynamicRoom.create({
            // roomId = 3
            name: 'crashsite',
            roomType: 'singleRoom',
            isOpen: true,
            solved: false,
            prevRooms: [2],
            nextRooms: [2],
            dgId: 1,
            levelId: 2
        }), 
        DynamicRoom.create({
            // roomId = 4
            name: 'village',
            roomType: 'singleRoom',
            isOpen: false,
            solved: false,
            prevRooms: [2],
            nextRooms: [2],
            dgId: 1,
            levelId: 2
        }),
        DynamicRoom.create({
            // roomId = 5
            name: 'boat',
            roomType: 'singleRoom',
            isOpen: false,
            solved: false,
            prevRooms: [2],
            nextRooms: [2, 7],
            dgId: 1,
            levelId: 3
        }),
        DynamicRoom.create({
            // roomId = 6
            name: 'islandMap',
            roomtype: 'lobbyRoom',
            isOpen: true,
            prevRooms: [4, 5, 6, 7],
            nextRooms: [4, 5, 6, 7],
            dgId: 1,
            levelId: 3
        }),
        DynamicRoom.create({
            // roomId = 7
            name: 'crashsite',
            roomType: 'singleRoom',
            isOpen: true,
            solved: false,
            prevRooms: [2],
            nextRooms: [2],
            dgId: 1,
            levelId: 3
        }),
        DynamicRoom.create({
            // roomId = 8
            name: 'victory',
            roomType: 'victoryPage',
            isOpen: false,
            prevRooms: [5],
            dgId: 1,
            levelId: 4
        }), 
    ]);

    const IslandImages = await Promise.all([
        Image.create({ name: IslandGameImg[0].split('/').pop(), imgType: 'background', src: IslandGameImg[0], dgId: 1, roomId: 1 }), // -- id: 1
        Image.create({ name: IslandGameImg[0].split('/').pop(), imgType: 'background', src: IslandGameImg[0], dgId: 1, roomId: 2 }), // -- id: 2
        Image.create({ name: IslandGameImg[2].split('/').pop(), imgType: 'background', src: IslandGameImg[2], dgId: 1, roomId: 3 }),
        Image.create({ name: IslandGameImg[3].split('/').pop(), imgType: 'background', src: IslandGameImg[3], dgId: 1, roomId: 4 }),
        Image.create({ name: IslandGameImg[4].split('/').pop(), imgType: 'background', src: IslandGameImg[4], dgId: 1, roomId: 5 }),
        Image.create({ name: IslandGameImg[5].split('/').pop(), imgType: 'background', src: IslandGameImg[5], dgId: 1, roomId: 6 }),
        Image.create({ name: IslandGameImg[5].split('/').pop(), imgType: 'background', src: IslandGameImg[5], dgId: 1, roomId: 7 }),
    ]);

    // --

    // Create SpaceGame seed data
//     await DynamicGame.create({ title: 'SpaceGame' });

//     const SpaceLevels = await Promise.all([
//         Level.create({ name: 'landingPage', isOpen: true, gameId: 2 }),
//         Level.create({ name: 'planets', isOpen: true, gameId: 2 }),
//         Level.create({ name: 'earth', isOpen: true, gameId: 2 }),
//         Level.create({ name: 'jupiter', isOpen: true, gameId: 2 }),
//         Level.create({ name: 'victory', isOpen: true, gameId: 2 }),
//     ]);

//     const SpaceRooms = await Promise.all([
//         DynamicRoom.create({ name: 'landingPage', roomType: 'landingPage', isOpen: true, prevRoomId: , gameId: 2, levelId: 1 }), // id = 1
//         DynamicRoom.create({ name: 'planets', roomtype: 'lobbyRoom', isOpen: true, prevRoomId: , gameId: 2, levelId: 2 }), // id = 2
//         DynamicRoom.create({ name: 'earth', roomType: 'singleRoom', isOpen: true, prevRoomId: , gameId: 2, levelId: 2 }), // id = 3
//         DynamicRoom.create({ name: 'jupiter', roomType: 'singleRoom', isOpen: true, prevRoomId: , gameId: 2, levelId: 2 }), // id = 4
//         DynamicRoom.create({ name: 'victory', roomType: 'victoryPage', isOpen: true, prevRoomId: , gameId: 2, levelId: 3 }), // id = 5
//     ]);

//     const SpaceImages = await Promise.all([
//         Image.create({ name: SpaceGameImg[0].split('/').pop(), imgType: 'background', src: SpaceGameImg[0], gameId: 2, roomId: 4 }), 
//         Image.create({ name: SpaceGameImg[1].split('/').pop(), imgType: 'background', src: SpaceGameImg[1], gameId: 2, roomId: 1 }),
//         Image.create({ name: SpaceGameImg[2].split('/').pop(), imgType: 'background', src: SpaceGameImg[2], gameId: 2, roomId: 2 }),
//         Image.create({ name: SpaceGameImg[3].split('/').pop(), imgType: 'background', src: SpaceGameImg[3], gameId: 2, roomId: 3 }),
//         Image.create({ name: SpaceGameImg[4].split('/').pop(), imgType: 'background', src: SpaceGameImg[4], gameId: 2, roomId: 5 }),
//     ]);
}

module.exports = dg_syncAndSeed;