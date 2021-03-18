const Puzzle = require('../db/models/Puzzle');

const router = require('express').Router();

//router mounted at /api/puzzles
router.get('/', async (req, res, next) => {
  const puzzles = await Puzzle.findAll();
  res.send(puzzles);
});

module.exports = router;
