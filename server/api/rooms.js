const router = require('express').Router();
const {
  models: { Room, Puzzle },
} = require('../db');
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
    const rooms = await Room.findAll(
        {
          where : {
            id : req.params.id
          },
            include: [Puzzle]
        }
    );
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
});

//get single puzzle that belongs to room...
router.get('/:id/puzzles/:puzzleId', async (req, res, next) => {
  try {
    const puzzle = await Puzzle.findOne(
        {
          where : {
            id : req.params.puzzleId,
            roomId : req.params.id
          }
        });
    res.status(200).send(puzzle);
  } catch (err) {
    next(err);
  }
});



