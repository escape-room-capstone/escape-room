const db = require('./db');

const User = require('./models/User');
const Puzzle = require('./models/Puzzle');
const Theme = require('./models/Theme');

//I want to make associations so that themes can have many puzzles
//and puzzles can be assigned to which ever theme.
//Im not sure about the below?
Theme.hasMany(Puzzle);
// Puzzle.hasMany(Theme);
Puzzle.belongsTo(Theme);

const syncAndSeed = async () => {
  await db.sync({ force: true });

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

  const puzzles = await Promise.all([
    Puzzle.create({
      name: 'atticP1',
      prompt: 'this is attic riddle 1',
      solution: 'this is attic solution 1',
      clue: 'i am attic puzzle 1 clue',
    }),
    Puzzle.create({
      name: 'atticP2',
      prompt: 'this is attic riddle 2',
      solution: 'this is attic solution 2',
      clue: 'i am attic puzzle 2 clue',
    }),
    Puzzle.create({
      name: 'atticP3',
      prompt: 'this is attic riddle 3',
      solution: 'this is attic solution 3',
      clue: 'i am attic puzzle 3 clue',
    }),
  ]);

  const [cody, arwinder, kate, nes, steve, roman] = users;
  const [atticPuzzleOne, atticPuzzleTwo, atticPuzzleThree] = puzzles;

  return {
    users: {
      cody,
      arwinder,
      kate,
      nes,
      steve,
      roman,
    },
    puzzles: {
      atticPuzzleOne,
      atticPuzzleTwo,
      atticPuzzleThree,
    },
  };
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Puzzle,
  },
};
