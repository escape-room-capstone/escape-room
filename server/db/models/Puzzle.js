
const db = require('../db');
const { Sequelize, INTEGER } = require('sequelize');
const { STRING } = Sequelize;

const Puzzle = db.define('puzzle', {
  type: {
    type: STRING,
  },
  number: {
    type: INTEGER,
  },
  prompt: {
    type: STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  solution: {
    type: STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: STRING,
  },


module.exports = Puzzle;
