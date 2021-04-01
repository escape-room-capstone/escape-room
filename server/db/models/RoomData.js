const db = require('../db');
const { Sequelize, TEXT } = require('sequelize');
const { STRING, ARRAY, INTEGER } = Sequelize;

const RoomData = db.define('roomdata', {
  top: {
    type: Sequelize.STRING,
    defaultValue: '150',
  },
  left: {
    type: Sequelize.STRING,
    defaultValue: '600',
  },
  width: {
    type: Sequelize.STRING,
    defaultValue: '70',
  },
  height: {
    type: Sequelize.STRING,
    defaultValue: '20',
  },
  puzzleText: {
    type: TEXT,
    allowNull: true,
  },
});

module.exports = RoomData;
