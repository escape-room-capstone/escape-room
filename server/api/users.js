const router = require('express').Router();
const {
  models: { User, Game, Puzzle, Room, Theme, RoomData },
} = require('../db');
const GamePuzzles = require('../db/models/GamePuzzles');
// const Puzzle = require('../db/models/Puzzle');

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

router.get('/:userId/games', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).send(games);
  } catch (er) {
    next(er);
  }
});

//fetch a default(one of our games like haunted, bank, etc)game that a user created
router.get('/:userId/games/:gameId', async (req, res, next) => {
  try {
    let game = await Game.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.gameId,
      },
    });
    const testGame = await Game.findOne({
      where: {
        userId: req.params.userId,
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
//fetch a custom dynamic game
router.get('/:userId/games/custom/:gameId', async (req, res, next) => {
  try {
    let game = await Game.findOne({
      where: { id: req.params.gameId },
      include: { model: Room, include: [Puzzle] },
    });
    res.send(game);
  } catch (er) {
    next(er);
  }
});
//route to customize a default type (bank, haunted, etc)game
router.post('/:userId/games', async (req, res, next) => {
  console.log(req.body, 'req.body');
  console.log(req.params.userId);
  try {
    let game = await Game.create({
      title: req.body.title,
      numPuzzles: req.body.numPuzzles,
      theme: req.body.theme,
      userId: req.params.userId,
      description: req.body.description,
    });

    const { puzzleArray } = req.body;
    //there is a check on the front end regarding puzzle length -- may not need this if condition here on line 105
    // if (puzzleArray.length > 0) {
    for (let i = 0; i < puzzleArray.length; i++) {
      // just need puzzleId here - can use use puzzleArray bc it's an array of puzzle Ids right?
      // const puzzle = await Puzzle.findByPk(puzzleArray[i]);
      GamePuzzles.create({ gameId: game.id, puzzleId: puzzleArray[i].id });
    }
    // }
    game = await game.loadGame();
    console.log(game, 'game');
    res.send(game);
  } catch (ex) {
    console.log(ex);
  }
});

//route to create a dynamic game from scratch
router.post('/:userId/games/custom', async (req, res, next) => {
  try {
    let {
      title,
      description,
      theme,
      themeId,
      numPuzzles,
      puzzleArray,
    } = req.body;
    let game = await Game.create({
      title,
      description,
      theme,
      numPuzzles,
      themeId,
      userId: req.params.userId,
    });

    //find theme and corresponding images
    theme = await Theme.findOne({ where: { name: req.body.theme } });
    const { images } = theme;
    // create 4 rooms associated with the new gameId with a number of 1-4 and assign an imgSrc from images array
    for (let i = 1; i < 5; i++) {
      await Room.create({
        gameId: game.id,
        number: i,
        imgSrc: images[i - 1],
      });
    }
    //find rooms 1, 2, 3, 4 instances
    const room1 = await Room.findOne({ where: { gameId: game.id, number: 1 } });
    const room2 = await Room.findOne({ where: { gameId: game.id, number: 2 } });
    const room3 = await Room.findOne({ where: { gameId: game.id, number: 3 } });
    const room4 = await Room.findOne({ where: { gameId: game.id, number: 4 } });

    //add 3 puzzles to each room instance for the newly created game
    for (let i = 0; i < 3; i++) {
      await RoomData.create({ roomId: room1.id, puzzleId: puzzleArray[i] });
    }
    for (let i = 3; i < 6; i++) {
      await RoomData.create({ roomId: room2.id, puzzleId: puzzleArray[i] });
    }
    for (let i = 6; i < 9; i++) {
      await RoomData.create({ roomId: room3.id, puzzleId: puzzleArray[i] });
    }
    for (let i = 9; i < 12; i++) {
      await RoomData.create({ roomId: room4.id, puzzleId: puzzleArray[i] });
    }
    //find the game with id of newly created game, include Room model (with Puzzle model)
    game = await Game.findOne({
      where: { id: game.id },
      include: { model: Room, include: [Puzzle] },
    });
    console.log(game, 'game');
    res.send(game);
  } catch (ex) {
    next(ex);
  }
});
