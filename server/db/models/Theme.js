const { INTEGER, ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../db');

const { STRING, UUID, UUIDV4 } = Sequelize;

const Theme = db.define('theme', {
  name: {
    type: STRING,
  },
  backgroundImageOne: {
    type: STRING,
  },
  //   themeImages: {
  //     type: Sequelize.ARRAY(Sequelize.TEXT),
  //   },
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  numPuzzles: {
    type: INTEGER,
    defaultValue: 12,
  },
  type: {
    type: ENUM('default', 'custom'),
  },
  userId: {
    type: INTEGER,
  },
});

module.exports = Theme;
