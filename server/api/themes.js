const router = require('express').Router();
const {
  models: { Theme },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const themes = await Theme.findAll();
    res.status(200).send(themes);
  } catch (err) {
    next(err);
  }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const theme = await Theme.findByPk(id);
//     theme.update({
//       backgroundImageOne: req.body.image
//     });
//     res.status(200).send(theme);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const theme = await Theme.findByPk(id);
    res.status(200).send(theme);
  } catch (err) {
    next(err);
  }
});
