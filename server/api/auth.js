const router = require('express').Router();
const {
  models: { User },
} = require('../db');

//route to get a user by the token that is passed in through request headers
router.get('/user', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    // console.log(user, 'user from database');
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

//route for user to send credentials (username/password)
router.post('/login', async (req, res, next) => {
  try {
    console.log('at api/auth/login');
    const { email, password } = req.body;
    const token = await User.authenticate(email, password);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});
router.post('/signup', async (req, res, next) => {
  try {
    console.log('at api/auth/signup');
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, 'firstname and lastname');
    let user = await User.findOne({ where: { email } });
    if (user) {
      const error = Error('email already exists');
      error.status = 401;
      throw error;
    }
    user = await User.create({ firstName, lastName, email, password });
    const token = await User.authenticate(email, password);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
