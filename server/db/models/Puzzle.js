const Sequelize = require('sequelize');
const db = require('../db');

const { BOOLEAN, STRING, UUID, UUIDV4 } = Sequelize;

const Puzzle = db.define('puzzle', {
  // id: {
  //   type: UUID,
  //   defaultValue: UUIDV4,
  //   primaryKey: true,
  // },
  name: {
    type: STRING,
  },
  prompt: {
    type: STRING,
  },
  solution: {
    type: STRING,
  },
  clue: {
    type: STRING,
  },
  isSolved: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Puzzle;
