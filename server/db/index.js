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
    timer: 60,
    description: `Seeking shelter in a rainstorm after your car breaks down, you find yourself trapped in a haunted house. Solve the puzzles to escape.`,
    imgSrc: '/Images/hauntedhousefinal.jpg',
  });
  const defaultHouseOfRiddlez = await Game.create({
    title: 'House of Riddlez',
    theme: 'riddlez',
    public: true,
    imgSrc: '/Theme_Images/home.jpg',
    description: `You wake up one morning only to find out that you are trapped in a House of Riddles. The only way out is to solve every riddle! But there's a catch...`,
  });
  const defaultBank = await Game.create({
    title: 'Bank Robbery',
    theme: 'bank',
    public: true,
    imgSrc: 'Images/bank_background.jpg',
    description: `Rob a bank and escape with all the $$$`,
  });
  const defaultStarWars = await Game.create({
    title: 'Boba Fett',
    theme: 'starwars',
    public: true,
    imgSrc: 'Images/BobaFett.jpeg',
    description: `You are the bounty hunter Boba Fett and you recently captured a high value Jedi target. He managed to cause some damage to your ship with various encryptions preventing you from fixing it before the ship explodes. He's no good to you dead, so get moving.`,
  });

  //seed all puzzles - which will be associated with the same named components on the front end
  for (let i = 1; i < 16; i++) {
    await Puzzle.create({ name: `Puzzle${i}` });
  }
  //default puzzles for the Haunted Game/riddlezGame
  const hauntedId = defaultHauntedGame.id;
  const houseGameId = defaultHouseOfRiddlez.id;

  //seed puzzles for default Haunted Game/riddlezGame
  await Promise.all([
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 1 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 14 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 15 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 13 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 12 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 6 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 3 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 10 }),
    GamePuzzles.create({ gameId: hauntedId, puzzleId: 7 }),
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

  // const users = await Promise.all([
  await User.create({
    firstName: 'Cody',
    lastName: 'Redmile',
    phoneNumber: '824-191-7176',
    birthdate: '02/03/1938',
    email: 'cody@email.com',
    password: '123',
  });
  await User.create({
    firstName: 'Arwinder',
    lastName: 'Singh',
    phoneNumber: '786-575-5376',
    birthdate: '02/22/1977',
    email: 'arwinder@email.com',
    password: '4321',
  });
  await User.create({
    firstName: 'Kate',
    lastName: 'Quinn',
    phoneNumber: '677-460-2616',
    birthdate: '01/19/1999',
    email: 'kate@gmail.com',
    password: 'ballislyf',
  });

  await User.create({
    firstName: 'Vanessa',
    lastName: 'Lima',
    phoneNumber: '970-332-5313',
    birthdate: '12/24/1912',
    email: 'nes@gmail.com',
    password: 'nes123',
  });
  await User.create({
    firstName: 'Steve',
    lastName: 'Hunter',
    phoneNumber: '751-859-8487',
    birthdate: '01/19/1974',
    email: 'steve@gmail.com',
    password: 'steveee',
  });
  await User.create({
    firstName: 'Roman',
    lastName: 'Shteynberg',
    phoneNumber: '356-482-1361',
    birthdate: '05/22/1938',
    email: 'roman@gmail.com',
    password: 'password',
  });

  const themes = await Promise.all([
    Theme.create({
      name: 'Forest',
      backgroundImageOne: '/Theme_Images/Forest1.jpg',
      images: [
        '/Theme_Images/Forest1.jpg',
        '/Theme_Images/Forest2.jpg',
        '/Theme_Images/Forest3.jpg',
        '/Theme_Images/Forest4.jpeg',
        'Theme_Images/Forest5.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Cafe',
      type: 'custom',
      backgroundImageOne: '/Theme_Images/Cafe1.jpg',
      images: [
        '/Theme_Images/Cafe1.jpg',
        '/Theme_Images/Cafe2.jpg',
        '/Theme_Images/cafe3.jpg',
      ],
    }),
    Theme.create({
      name: 'Island',
      backgroundImageOne: '/Images/GameImages/IslandGame/landingpage.png',
      images: [
        '/Images/GameImages/IslandGame/landingpage.png',
        '/Images/GameImages/IslandGame/lobby-islandmap.png',
        '/Images/GameImages/IslandGame/room-boat.png',
        '/Images/GameImages/IslandGame/room-crashsite.png',
      ],
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
      images: ['/Theme_Images/Bank1.jpg'],
    }),

    Theme.create({
      name: 'Riddlez',
      backgroundImageOne: '../Theme_Images/home.jpg',
      images: [
        '../Theme_Images/home.jpg',
        '../Theme_Images/home1.jpg',
        '../Theme_Images/home2.jpg',
        '../Theme_Images/home3.jpg',
        '../Theme_Images/home4.jpg',
        '../Theme_Images/home5.jpg',
      ],
      type: 'default',
    }),
    Theme.create({
      name: 'Airport',
      backgroundImageOne: '../Theme_Images/airport3.jpg',
      images: [
        '../Theme_Images/airport1.jpg',
        '../Theme_Images/airport2.jpg',
        '../Theme_Images/airport3.jpg',
        '../Theme_Images/airport4.jpg',
        '../Theme_Images/airport5.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'City',
      backgroundImageOne: '../Theme_Images/city6.jpg',
      images: [
        '../Theme_Images/city1.jpg',
        '../Theme_Images/city2.jpg',
        '../Theme_Images/city3.jpg',
        '../Theme_Images/city4.jpg',
        '../Theme_Images/city5.jpg',
        '../Theme_Images/city6.jpg',
        '../Theme_Images/city7.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Dentist',
      backgroundImageOne: '../Theme_Images/dentist1.jpg',
      images: ['../Theme_Images/dentist1.jpg', '../Theme_Images/dentist2.jpg'],
      type: 'custom',
    }),
    Theme.create({
      name: 'Facility',
      backgroundImageOne: '../Theme_Images/facility1.jpg',
      images: [
        '../Theme_Images/facility1.jpg',
        '../Theme_Images/facility2.jpg',
        '../Theme_Images/facility3.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Office',
      backgroundImageOne: '../Theme_Images/office1.jpg',
      images: [
        '../Theme_Images/police4.jpg',
        '../Theme_Images/office1.jpg',
        '../Theme_Images/office2.jpg',
        '../Theme_Images/home3.jpg',
        '../Theme_Images/school5.jpg',
        '../Theme_Images/school7.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Park',
      backgroundImageOne: '../Theme_Images/park2.jpg',
      images: [
        '../Theme_Images/park1.jpg',
        '../Theme_Images/park2.jpg',
        '../Theme_Images/park3.jpg',
        '../Theme_Images/park4.jpg',
        '../Theme_Images/park5.jpg',
        '../Theme_Images/park6.jpg',
        '../Theme_Images/park7.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Police',
      backgroundImageOne: '../Theme_Images/police1.jpg',
      images: [
        '../Theme_Images/police1.jpg',
        '../Theme_Images/police2.jpg',
        '../Theme_Images/police3.jpg',
        '../Theme_Images/police4.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'School',
      backgroundImageOne: '../Theme_Images/school1.jpg',
      images: [
        '../Theme_Images/school1.jpg',
        '../Theme_Images/school2.jpg',
        '../Theme_Images/school3.jpg',
        '../Theme_Images/school4.jpg',
        '../Theme_Images/school5.jpg',
        '../Theme_Images/school6.jpg',
        '../Theme_Images/school7.jpg',
      ],
      type: 'custom',
    }),
    Theme.create({
      name: 'Shopping',
      backgroundImageOne: '../Theme_Images/shopping1.jpg',
      images: [
        '../Theme_Images/shopping1.jpg',
        '../Theme_Images/shopping2.jpg',
        '../Theme_Images/shopping3.jpg',
        '../Theme_Images/shopping4.jpg',
      ],
      type: 'custom',
    }),
  ]);

  // const [cody, arwinder, kate, nes, steve, roman] = users;

  const [
    forest,
    cafe,
    haunted,
    bank,
    riddlez,
    airport,
    city,
    dentist,
    facility,
    office,
    park,
    police,
    school,
    shopping,
  ] = themes;

  // return users;
};

module.exports = {
  db,
  syncAndSeed,

  models: { Puzzle, Game, GamePuzzles, User, Theme, Room, RoomData },
};
