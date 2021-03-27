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



