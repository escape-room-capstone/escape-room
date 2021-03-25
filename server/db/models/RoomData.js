const db = require('../db');
const { Sequelize } = require('sequelize');
const { STRING } = Sequelize;

const RoomData = db.define('roomdata', {});

module.exports = RoomData;
