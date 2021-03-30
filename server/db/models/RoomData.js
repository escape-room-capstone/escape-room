const db = require('../db');
const { Sequelize } = require('sequelize');
const { STRING, ARRAY, INTEGER } = Sequelize;

const RoomData = db.define('roomdata', {
    XY1: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
    XY2: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      }      
});

module.exports = RoomData;
