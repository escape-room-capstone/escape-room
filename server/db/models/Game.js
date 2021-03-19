const db = require('../db');
const { Sequelize, ENUM } = require('sequelize');
const { STRING } = Sequelize;

const Game = db.define('game', {
  title: {
    type: STRING,
  },
  theme: {
    type: ENUM('haunted', 'house', 'bank', 'star wars'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Game.prototype.loadGame = async function () {
  const title = this.title;
  const theme = this.theme;
  const puzzles = await this.getPuzzles();
  return { title, theme, puzzles };
};

module.exports = Game;
