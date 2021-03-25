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
  themeImages: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
});

module.exports = Theme;
