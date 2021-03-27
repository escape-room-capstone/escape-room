//access point for all things db related

const db = require('./db.js');

// require all Models
const User = require('./models/User');
const Theme = require('./models/Theme');
const Game = require('./models/Game');
const Puzzle = require('./models/Puzzle.js');
const GamePuzzles = require('./models/GamePuzzles.js');

const Room = require('./models/Room.js');
const RoomData = require('./models/RoomData');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dg_syncAndSeed = require('../seed/dynamic');


// Model associations
Game.belongsToMany(Puzzle, { through: GamePuzzles, foreignKey: 'gameId' });
Puzzle.belongsToMany(Game, { through: GamePuzzles, foreignKey: 'puzzleId' });

Game.belongsTo(User);
User.hasMany(Game);

Puzzle.belongsToMany(Room, { through: RoomData });
Room.belongsToMany(Puzzle, { through: RoomData });

Room.belongsTo(Game);
Game.hasMany(Room);

//define syncAndSeed function
const syncAndSeed = async () => {
  await db.sync({ force: true });
  //   await dg_syncAndSeed();

  //create default Haunted Game
  const defaultHauntedGame = await Game.create({
    title: 'The Haunted House',
    theme: 'haunted',
    numPuzzles: 9,
    public: true,
    description: `Seeking shelter in a rainstorm after your car breaks down, you find yourself trapped in a haunted house. Solve the puzzles to escape.`,
    imgSrc: '/Images/hauntedhousefinal.jpg',
  });
  const defaultHouseOfRiddlez = await Game.create({
    title: 'House of Riddlez',
    theme: 'riddlez',
    public: true,
    imgSrc: '/RiddlezImages/home.jpg',
    numPuzzles: 15,
    description: `You wake up one morning only to find out that you are trapped in a House of Riddles. The only way out is to solve every riddle! But there's a catch...`,
  });
  const defaultBank = await Game.create({
    title: 'Bank Robbery',
    theme: 'bank',
    public: true,
    numPuzzles: 12,
    imgSrc: 'Images/bank_background.jpg',
    description: `Rob a bank and escape with all the $$$`,
  });
  const defaultStarWars = await Game.create({
    title: 'BobaFett',
    theme: 'starwars',
    public: true,
    numPuzzles: 12,
    imgSrc:
      'https://static2.srcdn.com/wordpress/wp-content/uploads/2020/12/The-Mandalorian-Concept-Art-5-Boba-Fett-Ship.jpg?q=50&fit=crop&w=740&h=370',
    description: `description TBD`,
  });

  //seed all puzzles - which will be associated with the same named components on the front end
  for (let i = 1; i < 16; i++) {
    await Puzzle.create({ name: `Puzzle${i}` });
  }
  //default puzzles for the Haunted Game
  const hauntedId = defaultHauntedGame.id;
  const houseGameId = defaultHouseOfRiddlez.id;

  //seed puzzles for default Haunted Game
  await Promise.all([
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 1 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 2 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 3 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 4 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 5 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 6 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 7 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 8 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 9 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 1 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 2 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 3 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 4 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 5 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 6 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 7 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 8 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 9 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 10 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 11 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 12 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 13 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 14 }),
    GamePuzzles.create({ gameId: houseGameId, puzzleId: 15 }),
  ]);

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
      name: 'Forest',
      backgroundImageOne: '/Theme_Images/Forest1.jpg',
      images: [
        '/Theme_Images/Forest1.jpg',
        '/Theme_Images/Forest2.jpg',
        '/Theme_Images/Forest3.jpg',
        '/Theme_Images/Forest4.jpeg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Cafe',
      type: 'custom',
      backgroundImageOne: '/Theme_Images/Cafe1.jpg',
      images: ['/Theme_Images/Cafe1.jpg', '/Theme_Images/Cafe2.jpg'],
    }),
    Theme.create({
      name: 'Haunted',
      numPuzzles: 9,
      type: 'default',
      backgroundImageOne: '/Theme_Images/Haunted/Haunted1.jpg',
      images: [
        '/Theme_Images/Haunted/Haunted1.jpg',
        '/Theme_Images/Haunted/Haunted2.jpg',
        '/Theme_Images/Haunted/Haunted3.jpg',
        'Theme_Images/Haunted/Haunted4.jpg',
      ],
    }),
    Theme.create({
      name: 'Bank',
      numPuzzles: 9,
      type: 'default',
      backgroundImageOne: '/Theme_Images/Bank1.jpg',
    }),
    Theme.create({
      name: 'Riddles',
      numPuzzles: 9,
      type: 'default',
    }),

    Theme.create({
      name: 'House',
      backgroundImageOne: '../RiddlezImages/home.jpg',
      images: [
        '../RiddlezImages/home.jpg',
        '../RiddlezImages/livingroom.jpg',
        '../RiddlezImages/roomOne.jpg',
        '../RiddlezImages/roomTwo.jpg',
        '../RiddlezImages/attic.jpg',
        '../RiddlezImages/backroom.jpg',
      ],
      type: 'default',
    }),
    // Theme.create({
    //   name: 'Riddles',
    //   numPuzzles: 9,
    //   type: 'default',
    // }),
  ]);

  const [cody, arwinder, kate, nes, steve, roman] = users;

  const [forest, cafe, house, haunted, bank] = themes;

  return users;
};

module.exports = {
  db,
  syncAndSeed,

  models: { Puzzle, Game, GamePuzzles, User, Theme, Room, RoomData },
};
