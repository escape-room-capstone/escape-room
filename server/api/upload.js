const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {
  models: { User, Theme },
} = require('../db');

//set storage engine
var storage = multer.diskStorage({
  destination: 'public/Theme_Uploads',

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

//init upload
const upload = multer({
  storage: storage,
});
router.post('/', upload.single('image'), async (req, res, next) => {
  console.log(req.body, 'req.body'), console.log(req.file, 'req.file');
  try {
    const imgSrc = `/Theme_Uploads/${req.file.filename}`;
    await Theme.create({
      name: req.body.theme,
      backgroundImageOne: imgSrc,
      images: [imgSrc],
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
