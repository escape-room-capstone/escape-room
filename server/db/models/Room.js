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
  hint1: {
    type: STRING,
    allowNull: true,
  },
  hint2: {
    type: STRING,
    allowNull: true,
  },
  hint3: {
    type: STRING,
    allowNull: true,
  },
  narrative: {
    type: TEXT,
    allowNull: true,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = Room;
