const db = require('../db');
const { Sequelize, ENUM, INTEGER } = require('sequelize');
const { STRING, TEXT } = Sequelize;

const Game = db.define('game', {
  title: {
    type: STRING,
  },
  numPuzzles: {
    type: INTEGER,
    allowNull: false,
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
  const title = this.title;
  const theme = this.theme;
  const puzzles = await this.getPuzzles();
  return { title, theme, puzzles };
};

module.exports = Game;
