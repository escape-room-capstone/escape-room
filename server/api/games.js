const router = require('express').Router();
const {
  models: { Puzzle, Game, GamePuzzles, User, Room },
} = require('../db');

//mounted at /api/games

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll({ include: [User] });

    res.send(games);
  } catch (ex) {
    next(ex);
  }
});

//endpoint to fetch a default-type game (one of the ones that we created)
router.get('/:gameId', async (req, res, next) => {
  try {
    let game = await Game.findByPk(req.params.gameId);
    //this is an instance method I created when defining the Game model
    game = await game.loadGame();
    res.send(game);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:gameId/:roomNum', async (req, res, next) => {
  try {
    // let game = await Game.findByPk(req.params.gameId);
    // let rooms = await game.getRooms();
    let room = await Room.findOne({
      where: { gameId: req.params.gameId, number: req.params.roomNum },
      include: [Puzzle],
    });
    console.log(room, 'room');
    res.send(room);
  } catch (ex) {
    next(ex);
  }
});

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
