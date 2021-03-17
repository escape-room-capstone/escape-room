const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/puzzles', require('./puzzles'));
// router.use('/themes', require('./themes'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
