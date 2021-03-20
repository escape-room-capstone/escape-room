const router = require('express').Router();
const {
  models: { User, Game },
} = require('../db');

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

router.post('/:id/games', async (req, res, next) => {
  try {
    const game = await Game.create({
      title: req.body.title,
      numPuzzles: req.body.numPuzzles,
      theme: req.body.theme,
      userId: req.params.id,
    });
    res.send(game);
  } catch (ex) {
    next(ex);
  }
});

//Kate's testing route for customizing game we have hard-coded which is also creating a new game for a user
router.post('/:id/games', async (req, res, next) => {
  try {
    const game = await Game.create({
      title: req.body.title,
      numPuzzles: req.body.numPuzzles,
      theme: req.body.theme,
      userId: req.params.id,
    });
    res.send(game);
  } catch (ex) {
    next(ex);
  }
});
