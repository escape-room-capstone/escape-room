const db = require('../db');
const { Sequelize, INTEGER } = require('sequelize');
const { STRING, TEXT } = Sequelize;

const Puzzle = db.define('puzzle', {
  type: {
    type: STRING,
  },
  number: {
    type: INTEGER,
  },
  description: {
    type: TEXT,
  },
  nickname: {
    type: STRING,
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
});

module.exports = Puzzle;
