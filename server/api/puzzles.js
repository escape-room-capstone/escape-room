const router = require('express').Router();
const {
  models: { Puzzle },
} = require('../db');
module.exports = router;

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

// router.put('/:id', async (req, res, next) => {
//   try {
//     const puzzle = await Puzzle.findByPk(req.params.id);
//     res.status(201).send(await puzzle.update(req.body));
//   } catch (er) {
//     next(er);
//   }
// });

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const puzzle = await Puzzle.findByPk(req.params.id);
//     await puzzle.destroy();
//     res.sendStatus(204);
//   } catch (er) {
//     next(er);
//   }
// });
