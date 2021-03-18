const db = require('../db');
const { Sequelize } = require('sequelize');
const { STRING } = Sequelize;

const GamePuzzles = db.define('gamepuzzles', {});

module.exports = GamePuzzles;
