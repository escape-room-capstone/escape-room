const db = require('../db');
const { Sequelize } = require('sequelize');
const { STRING, ARRAY, INTEGER } = Sequelize;

const RoomData = db.define('roomdata', {
    top: {
        type: Sequelize.STRING,
        defaultValue: "150"
      },
    left: {
        type: Sequelize.STRING,
        defaultValue: "600"
      },
      width: {
        type: Sequelize.STRING,
        defaultValue: "70"
      },
      height: {
        type: Sequelize.STRING,
        defaultValue: "20"
      }
});

module.exports = RoomData;
