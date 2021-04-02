const router = require('express').Router();
const {
  models: { Room, Puzzle },
} = require('../db');
const RoomData = require('../db/models/RoomData');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      include: [Puzzle],
    });
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {

    console.log(req.body, "REQ BODY OBJECT FROM ASSIGNPUZZLES.JS");

    const roomIdArray = Object.keys(req.body);
    const roomNumberArr = Object.values(req.body);        

    for(let i = 0; i < roomIdArray.length; i++){
      let currentRoomId = roomIdArray[i];      
      let currentRoom = (await Room.findByPk(currentRoomId))

      currentRoom.number = roomNumberArr[i];

      await currentRoom.save()
    }
    
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({
      where: {
        id: req.params.id,
      },
      include: [Puzzle],
    });
    res.status(200).send(room);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/roomdata', async (req, res, next) => {
  try {
    const roomDataArray = await RoomData.findAll({
      where: {
        roomId: req.params.id,
      },
    });
    res.status(200).send(roomDataArray);
  } catch (err) {
    next(err);
  }
});

//gets single puzzle data that belongs to a single puzzle...
router.get('/:id/puzzles/:puzzleId', async (req, res, next) => {
  try {
    const puzzle = await RoomData.findOne({
      where: {
        roomId: req.params.id,
        puzzleId: req.params.puzzleId,
      },
    });
    res.status(200).send(puzzle);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne({ where: { id: req.params.id } });
    await room.update({ narrative: req.body.narrative });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//use the state from EditSingleRoom.js component to modify our DB entries
router.put('/:id/roomdata', async (req, res, next) => {
  try {
    const { puzzleText } = req.body;
    //add puzzle text to roomdata row if user sends puzzle text
    if (puzzleText) {
      const puzzleIds = Object.keys(puzzleText);
      for (let i = 0; i < puzzleIds.length; i++) {
        const roomdata = await RoomData.findOne({
          where: { roomId: req.params.id, puzzleId: puzzleIds[i] },
        });
        await roomdata.update({ puzzleText: puzzleText[puzzleIds[i]] });
      }
    }
    let roomDataObj = {};
    //Grab the KEYS from our req.body object, and put them into an Array. In editsingleroom.js we are passing down the STATE in our axios call, which sets our req.body to the state of EditSingleRoom.js.
    //The state holds KEY VALUE pairs, where the KEY is equal to our puzzleId.
    const puzzleIdArray = Object.keys(req.body.puzzleDimensions);
    console.log('PUZZLE ARRAY!', puzzleIdArray);
    console.log('REQ BODY', req.body);

    //dynamically fill in our roomDataObj with key value pairs. Key will equal to the puzzleId, and the value will equal to the room that has that puzzleId
    for (let i = 0; i < puzzleIdArray.length; i++) {
      let currentPuzzleId = puzzleIdArray[i];
      roomDataObj[currentPuzzleId] = await RoomData.findOne({
        where: {
          puzzleId: currentPuzzleId,
          roomId: req.params.id,
        },
      });
    }
    //throw the VALUES of our roomDataObj into an array, now we have an array of Room Data...
    const roomDataArray = Object.values(roomDataObj);

    //Loop over our Roomdata, and update our room data dynamically.
    //req.body is our whole state, which has key value pairs where the key is equal to puzzleId. so we are finding the edits where req.body[this current rooms puzzleId] and editing the database...
    for (let i = 0; i < roomDataArray.length; i++) {
      let currentRoomData = roomDataArray[i];
      let updateRoomData = await currentRoomData.update(
        req.body.puzzleDimensions[currentRoomData.puzzleId]
      );
      // console.log('ROOM DATA AFTER UPDATE', updateRoomData.dataValues);
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
