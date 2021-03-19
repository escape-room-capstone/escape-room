//access point for all things db related

const db = require('./db.js');

const User = require('./models/User');
const Theme = require('./models/Theme');
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
    numPuzzles: 9,
  });
  const gameId = defaultHauntedGame.id;
  //   //create 3 puzzles associated with default Haunted Game
  //seed all puzzles - which will be associated with the same named components on the front end
  for (let i = 1; i < 10; i++) {
    await Puzzle.create({ name: `Puzzle${i}` });
  }
  await GamePuzzles.create({ gameId: 1, puzzleId: 1 });
  await GamePuzzles.create({ gameId: 1, puzzleId: 2 });
  await GamePuzzles.create({ gameId: 1, puzzleId: 4 });




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

  const themes = await Promise.all([
    Theme.create({
      name: 'theWild',
      backgroundImageOne : "../../public/Theme_Images/the-wild.jpg"
    }),
    Theme.create({
      name: 'cafe',
      backgroundImageOne : "../../public/Theme_Images/cafe.jpg"
    })
  ]);

  //   const puzzles = await Promise.all([
  //     Puzzle.create({
  //       name: 'atticP1',
  //       prompt: 'this is attic riddle 1',
  //       solution: 'this is attic solution 1',
  //       clue: 'i am attic puzzle 1 clue',
  //     }),
  //     Puzzle.create({
  //       name: 'atticP2',
  //       prompt: 'this is attic riddle 2',
  //       solution: 'this is attic solution 2',
  //       clue: 'i am attic puzzle 2 clue',
  //     }),
  //     Puzzle.create({
  //       name: 'atticP3',
  //       prompt: 'this is attic riddle 3',
  //       solution: 'this is attic solution 3',
  //       clue: 'i am attic puzzle 3 clue',
  //     }),
  //   ]);

  // const RiddleTheme = await Theme.create({
  //   name: 'House of Riddles Theme',
  //   backgroundImageOne: '../RiddlezImages/home.jpg',
  //   backgroundImageTwo:'../RiddlezImages/livingroom.jpg',
  //   backgroundImageThree: '../RiddlezImages/roomOne.jpg',
  //   backgroundImageFour: '../RiddlezImages/roomTwo.jpg',
  //   backgroundImageFive: '../RiddlezImages/attic.jpg',
  //   backgroundImageSix: '../RiddlezImages/backroom.jpg',
  // })

  

  const [cody, arwinder, kate, nes, steve, roman] = users;
  const [theWild, cafe] = themes;
  //   const [atticPuzzleOne, atticPuzzleTwo, atticPuzzleThree] = puzzles;
};

module.exports = {
  db,
  syncAndSeed,
  models: { Puzzle, Game, GamePuzzles, User, Theme },
};
