const router = require('express').Router();
const GamePuzzles = require('../db/models/GamePuzzles');
const Puzzle = require('../db/models/Puzzle');

router.get('/', async (req, res, next) => {
  try {
    const puzzles = await Puzzle.findAll();
    res.status(200).send(puzzles);
  } catch (err) {
    next(err);
  }
});

router.post('/gamePuzzles', async (req, res, next) => {
  try {
    const gamePuzzle = await GamePuzzles.create({
      gameId: req.body.gameId,
      puzzleId: req.body.puzzleId,
    });

    res.send(gamePuzzle);
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

router.put('/:id', async (req, res, next) => {
  try {
    const puzzle = await Puzzle.findByPk(req.params.id);
    res.status(201).send(await puzzle.update(req.body));
  } catch (er) {
    next(er);
  }
});

module.exports = router;
