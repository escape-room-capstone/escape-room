const Sequelize = require('sequelize');
const db = require('../db');

const { STRING, UUID, UUIDV4 } = Sequelize;

const Theme = db.define('theme', {
  // id: {
  //   type: UUID,
  //   defaultValue: UUIDV4,
  //   primaryKey: true,
  // },
  name: {
    type: STRING,
  },

  backgroundImageOne: {
    type: STRING,
  },

  backgroundImageTwo: {
    type: STRING,
  },

  backgroundImageThree: {
    type: STRING,
  },

  backgroundImageFour: {
    type: STRING,
  },

  backgroundImageFive: {
    type: STRING,
  },

  backgroundImageSix: {
    type: STRING,
  },

  backgroundImageSeven: {
    type: STRING,
  },

  backgroundImageEight: {
    type: STRING,
  },

  backgroundImageNine: {
    type: STRING,
  },

  backgroundImageTen: {
    type: STRING,
  },
});

module.exports = Theme;
