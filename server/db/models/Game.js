const db = require('../db');
const { Sequelize, ENUM, INTEGER, BOOLEAN } = require('sequelize');
const { STRING, TEXT } = Sequelize;

const Game = db.define('game', {
  title: {
    type: STRING,
  },
  numPuzzles: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 9
  },
  public: {
    type: BOOLEAN,
    defaultValue: true

  },
  theme: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
  },
  imgSrc: {
    type: STRING,
  },
});

Game.prototype.loadGame = async function () {
  const id = this.id
  const title = this.title;
  const theme = this.theme;
  const puzzles = await this.getPuzzles();
  const numPuzzles = this.numPuzzles;
  const public = this.public;
  const userId = this.userId
  return { id, title, theme, puzzles, numPuzzles, public, userId };
};

module.exports = Game;
