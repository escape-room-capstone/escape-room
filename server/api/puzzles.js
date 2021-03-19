const router = require('express').Router();
const Puzzle = require('../db/models/Puzzle');

router.get('/', async (req, res, next) => {
  try {
    const puzzles = await Puzzle.findAll();
    res.status(200).send(puzzles);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const puzzle = await Puzzle.findByPk(id);
    res.status(200).send(puzzle);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
