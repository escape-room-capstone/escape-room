const router = require('express').Router();
const {
  models: { Puzzle, Game, GamePuzzles, User, Room },
} = require('../db');

//mounted at /api/games

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll({ include: [Room] });
    res.send(games);
  } catch (ex) {
    next(ex);
  }
});

//endpoint to fetch a default-type game (one of the ones that we created)
router.get('/:gameId', async (req, res, next) => {
  try {
    let game = await Game.findOne({
      where: {
        id: req.params.gameId,
      },
      include: { model: Room, include: [Puzzle] },
    });
    //very simple if statement, so both games work, this can be removed later.
    //If userId is null, this is one of our default games, so we'll use the instance method.
    if (game.userId === null) {
      game = await game.loadGame();
    }
    //otherwise we'll just return our game with the rooms and puzzles
    res.send(game);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:gameId/:roomId', async (req, res, next) => {
  try {
    // let game = await Game.findByPk(req.params.gameId);
    // let rooms = await game.getRooms();
    let room = await Room.findOne({
      where: { gameId: req.params.gameId, id: req.params.roomId },
      include: [Puzzle],
    });
    res.send(room);
  } catch (ex) {
    next(ex);
  }
});

// route to update game timer in custom game
router.put('/:gameId', async (req, res, next) => {
  try {
    let game = await Game.findOne({
      where: {
        id: req.params.gameId,
      },
      include: { model: Room, include: [Puzzle] },
    });
    await game.update({ countdown: req.body.time })
    res.send(game);
  } catch (er) {
    next(er);
  }
});

// router.get('/:gameId/:roomNum', async (req, res, next) => {
//   try {
//     // let game = await Game.findByPk(req.params.gameId);
//     // let rooms = await game.getRooms();
//     let room = await Room.findOne({
//       where: { gameId: req.params.gameId, number: req.params.roomNum },
//       include: [Puzzle],
//     });
//     console.log(room, 'room');
//     res.send(room);
//   } catch (ex) {
//     next(ex);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try{
//     const game = await Game.create({
//       title: req.body.title,
//       numPuzzles: req.body.numPuzzles,
//       theme: req.body.theme
//     })
//     res.send(game);
//   }
//   catch(ex){
//     next(ex);
//   }
// })

module.exports = router;
