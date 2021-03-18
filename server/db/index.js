//access point for all things db related

const db = require('./db.js');

// require all Models and make asssociation here as well
const Game = require('./models/Game');
const Puzzle = require('./models/Puzzle.js');
const GamePuzzles = require('./models/GamePuzzles.js');

// Model associations
Game.belongsToMany(Puzzle, { through: GamePuzzles, foreignKey: 'gameId' });
Puzzle.belongsToMany(Game, { through: GamePuzzles, foreignKey: 'puzzleId' });

//define syncAndSeed function
const syncAndSeed = async () => {
  await db.sync({ force: true });
  //create default Haunted Game
  const defaultHauntedGame = await Game.create({
    title: 'The Haunted House',
    theme: 'haunted',
  });
  const gameId = defaultHauntedGame.id;
  //   //create 3 puzzles associated with default Haunted Game
  //seed all puzzles - which will be associated with the same named components on the front end
  for (let i = 1; i < 10; i++) {
    await Puzzle.create({ name: `Puzzle${i}` });
  }
  await GamePuzzles.create({ gameId: 1, puzzleId: 1 });
  await GamePuzzles.create({ gameId: 1, puzzleId: 6 });
  await GamePuzzles.create({ gameId: 1, puzzleId: 5 });
};

module.exports = { db, syncAndSeed, models: { Puzzle, Game, GamePuzzles } };
