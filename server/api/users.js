const router = require('express').Router();
const {
  models: { User },
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
