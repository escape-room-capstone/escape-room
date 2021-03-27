const db = require('../db');
const { Sequelize } = require('sequelize');
const { STRING, BOOLEAN, TEXT, INTEGER } = Sequelize;

//can we delete all the commented out attributes below??

const Puzzle = db.define('puzzle', {
  // type: {
  //   type: STRING,
  // },
  // number: {
  //   type: INTEGER,
  // },
  // description: {
  //   type: TEXT,
  // },
  // nickname: {
  //   type: STRING,
  // },
  // prompt: {
  //   type: STRING,
  //   allowNull: true,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  // solution: {
  //   type: STRING,
  //   allowNull: true,
  //   validate: {
  //     notEmpty: true,
  //   },
  // },
  name: {
    type: STRING,
  },
  isSolved: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Puzzle;
