//access point for all things db related
const db = require('./db.js');

// require all Models and make asssociation here as well
const User = require('./models/User');
const Theme = require('./models/Theme');
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

  //create default House of Riddles Game
  const defaultHouseGame = await Game.create({
    title: 'The House of Riddles',
    theme: 'house',
  });

  //store dafault game ids
  const hauntedGameId = defaultHauntedGame.id;
  const houseGameId = defaultHouseGame.id;

  //create 3 puzzles associated with default Haunted Game
  //seed all puzzles - which will be associated with the same named components on the front end
  for (let i = 1; i < 11; i++) {
    await Puzzle.create({ name: `Puzzle${i}` });
  }
  //assign puzzles to specific game(will show up in gamepuzzle through table)
  await GamePuzzles.create({ gameId: hauntedGameId, puzzleId: 1 });
  await GamePuzzles.create({ gameId: hauntedGameId, puzzleId: 6 });
  await GamePuzzles.create({ gameId: hauntedGameId, puzzleId: 5 });

  //create puzzle data for house game
  const puzzles = await Promise.all([
    Puzzle.create({
      number: 1,
      prompt: 'this is attic riddle 1',
      solution: 'this is attic solution 1',
      name: 'atticP1',
    }),
    Puzzle.create({
      number: 2,
      prompt: 'this is attic riddle 2',
      solution: 'this is attic solution 2',
      name: 'atticP2',
    }),
    Puzzle.create({
      number: 3,
      prompt: 'this is attic riddle 3',
      solution: 'this is attic solution 3',
      name: 'atticP3',
    }),
  ]);

  //destructure puzzle array
  const [atticPuzzleOne, atticPuzzleTwo, atticPuzzleThree] = puzzles;

  //assign puzzles to specific game (will show up in gamepuzzle through table)
  defaultHouseGame.addPuzzle([
    atticPuzzleOne,
    atticPuzzleTwo,
    atticPuzzleThree,
  ]);

  //below does the same as the above addPuzzle method
  // await GamePuzzles.create({
  //   gameId: houseGameId,
  //   puzzleId: atticPuzzleOne.id,
  // });
  // await GamePuzzles.create({
  //   gameId: houseGameId,
  //   puzzleId: atticPuzzleTwo.id,
  // });
  // await GamePuzzles.create({
  //   gameId: houseGameId,
  //   puzzleId: atticPuzzleThree.id,
  // });

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Redmile',
      phoneNumber: '824-191-7176',
      birthdate: '02/03/1938',
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Arwinder',
      lastName: 'Singh',
      phoneNumber: '786-575-5376',
      birthdate: '02/22/1977',
      email: 'arwinder@email.com',
      password: '4321',
    }),
    User.create({
      firstName: 'Kate',
      lastName: 'Quinn',
      phoneNumber: '677-460-2616',
      birthdate: '01/19/1999',
      email: 'kate@gmail.com',
      password: 'ballislyf',
    }),
    User.create({
      firstName: 'Vanessa',
      lastName: 'Lima',
      phoneNumber: '970-332-5313',
      birthdate: '12/24/1912',
      email: 'nes@gmail.com',
      password: 'nes123',
    }),
    User.create({
      firstName: 'Steve',
      lastName: 'Hunter',
      phoneNumber: '751-859-8487',
      birthdate: '01/19/1974',
      email: 'steve@gmail.com',
      password: 'steveee',
    }),
    User.create({
      firstName: 'Roman',
      lastName: 'Shteynberg',
      phoneNumber: '356-482-1361',
      birthdate: '05/22/1938',
      email: 'roman@gmail.com',
      password: 'password',
    }),
  ]);

  const [cody, arwinder, kate, nes, steve, roman] = users;

  const RiddleTheme = await Theme.create({
    name: 'House of Riddles Theme',
    themeLabel: 'house',
    backgroundImageOne: '../RiddlezImages/home.jpg',
    backgroundImageTwo: '../RiddlezImages/livingroom.jpg',
    backgroundImageThree: '../RiddlezImages/roomOne.jpg',
    backgroundImageFour: '../RiddlezImages/roomTwo.jpg',
    backgroundImageFive: '../RiddlezImages/attic.jpg',
    backgroundImageSix: '../RiddlezImages/backroom.jpg',
  });
};

module.exports = {
  db,
  syncAndSeed,
  models: { Puzzle, Game, GamePuzzles, User, Theme },
};
