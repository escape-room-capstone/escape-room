const Sequelize = require('sequelize');

const config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

// //https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
// if (process.env.DATABASE_URL) {
//   config.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// }

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/escape_room`,
  config
);
module.exports = db;

//adding this from nicks comment about heroku being updated:

// let config;
// if (process.env.DATABASE_URL) {
//   config = {
//     logging: false,
//     operatorsAliases: false,
//     dialect: "postgres",
//     protocol: "postgres",
//     ssl: true,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// } else {
//   config = {
//     logging: false,
//     operatorsAliases: false,
//   }
// }
// const client = new Sequelize(dbUrl, config)