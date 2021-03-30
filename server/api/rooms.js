const router = require('express').Router();
const {
  models: { Room, Puzzle },
} = require('../db');
const RoomData = require('../db/models/RoomData');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll(
        {
            include: [Puzzle]
        }
    );
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const room = await Room.findOne(
        {
          where : {
            id : req.params.id
          },
            include: [Puzzle]
        }
    );
    res.status(200).send(room);
  } catch (err) {
    next(err);
  }
});


//gets single puzzle data that belongs to a single puzzle...
router.get('/:id/puzzles/:puzzleId', async (req, res, next) => {
  try {
    const puzzle = await RoomData.findOne({
      where : {
        roomId : req.params.id,
        puzzleId : req.params.puzzleId
      }
    })    
    res.status(200).send(puzzle);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/puzzles/:puzzleId', async (req, res, next) => {
  try {
    const puzzleData = await RoomData.findOne({
      where : {
        roomId : req.params.id,
        puzzleId : req.params.puzzleId
      }
    }) 
    puzzle.update({
      XY1 : req.body.XY1,
      XY2 : req.body.XY2
    })   
    res.status(200).send(puzzleData);
  } catch (err) {
    next(err);
  }
});






