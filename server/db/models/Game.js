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
    defaultValue: 9,
  },
  public: {
    type: BOOLEAN,
    defaultValue: false,
  },
  theme: {
    type: STRING,
    allowNull: true,
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
  timer: INTEGER,
  countdown: {
    type: INTEGER,
    defaultValue: -1,
  },
});

Game.prototype.loadGame = async function () {
  const id = this.id;
  const title = this.title;
  const theme = this.theme;
  const puzzles = await this.getPuzzles();
  const numPuzzles = this.numPuzzles;
  const public = this.public;
  const userId = this.userId;
  const timer = this.timer;
  const countdown = this.countdown;
  return {
    id,
    title,
    theme,
    puzzles,
    numPuzzles,
    public,
    userId,
    timer,
    countdown,
  };
};

Game.prototype.createCustomGame = async function () {};

module.exports = Game;
