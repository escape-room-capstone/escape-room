const db = require('../db');
const { Sequelize, ENUM, INTEGER, BOOLEAN } = require('sequelize');
const { STRING, TEXT } = Sequelize;

const Room = db.define('room', {
  number: {
    type: INTEGER,
    allowNull: false,
  },
  imgSrc: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
});

module.exports = Room;
