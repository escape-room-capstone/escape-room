const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BOOLEAN, STRING, INTEGER, UUID, UUIDV4 } = Sequelize;

const User = db.define('user', {
  firstName: {
    type: STRING,
    defaultValue: '',
  },
  lastName: {
    type: STRING,
    defaultValue: '',
  },
  phoneNumber: {
    type: STRING,
    defaultValue: '(xxx) xxx-xxxx',
  },
  birthdate: {
    type: STRING,
    defaultValue: 'MM/DD/YYYY',
  },
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // isAdmin: {
  //   type: BOOLEAN,
  //   defaultValue: false,
  // },
});

// bcrypt User.addHook with 10 salt rounds
// User.addHook('beforeSave', async function (user) {
//   if (user._changed.has('password')) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }
// });
User.addHook('beforeSave', async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});
User.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

// //instance method that generates a JWT token for a user - using the user instance
// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, process.env.JWT);
// };
// User.authenticate method
User.authenticate = async function (email, password) {
  const user = await User.findOne({
    where: { email },
  });
  // this gets slower because of the 10 salt rounds

  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, process.env.JWT);
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};

// pass in a token and get the user associated with that token
User.byToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (user) {
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

module.exports = User;
