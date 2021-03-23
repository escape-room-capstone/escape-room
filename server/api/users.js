const router = require('express').Router();
const {
  models: { User, Game },
} = require('../db');
const GamePuzzles = require('../db/models/GamePuzzles');
const Puzzle = require('../db/models/Puzzle');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'phoneNumber',
        'birthdate',
        'email',
        'isAdmin',
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.status(200).send(user);
  } catch (er) {
    next(er);
  }
});

router.get('/:id/games', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).send(games);
  } catch (er) {
    next(er);
  }
});

router.get('/:id/games/:gameId', async (req, res, next) => {
  try {
    let game = await Game.findOne({
      where: {
        userId: req.params.id,
        id: req.params.gameId,
      },
    });
    const testGame = await Game.findOne({
      where: {
        userId: req.params.id,
        id: req.params.gameId,
      },
      include: [Puzzle],
    });
    res.send(testGame);
    // game = await game.loadGame();
    // res.status(200).send(game);
  } catch (er) {
    next(er);
  }
});

router.post('/:id/games', async (req, res, next) => {
  console.log(req.body, 'req.body');
  try {
    let game = await Game.create({
      title: req.body.title,
      numPuzzles: req.body.numPuzzles,
      theme: req.body.theme,
      userId: req.params.id,
    });

    const { puzzleArray } = req.body;

    if (puzzleArray.length > 0) {
      for (let i = 0; i < puzzleArray.length; i++) {
        const puzzle = await Puzzle.findByPk(puzzleArray[i]);
        GamePuzzles.create({ gameId: game.id, puzzleId: puzzle.id });
      }
    }
    game = await game.loadGame();
    console.log(game, 'game');
    res.send(game);
  } catch (ex) {
    next(ex);
  }
});
