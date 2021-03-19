const Sequelize = require('sequelize');
const db = require('../db');

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
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
