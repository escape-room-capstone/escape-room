const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/themes', require('./themes'));
router.use('/games', require('./games.js'));
router.use('/puzzles', require('./puzzles'));

//any other request to /api/? is not defined in our routes so express will throw a 404 error

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;