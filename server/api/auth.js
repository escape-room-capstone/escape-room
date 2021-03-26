const router = require('express').Router();
const {
  models: { User },
} = require('../db');

//route to get a user by the token that is passed in through request headers
router.get('/user', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    console.log(user, 'user from database');
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

module.exports = router;
