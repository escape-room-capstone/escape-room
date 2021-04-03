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
router.post('/', upload.array('images'), async (req, res, next) => {
  console.log(req.body, 'req.body');
  const images = req.files.map((file) => `/Theme_Uploads/${file.filename}`);
  console.log(images, 'images');
  try {
    // const imgSrc = `/Theme_Uploads/${req.file.filename}`;
    await Theme.create({
      name: req.body.theme,
      backgroundImageOne: images[0],
      images: images,
    });
    res.redirect('/choosethemes');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
