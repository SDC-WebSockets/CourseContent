const db = require('./pg_db.js');
const queries = require('./queries.js');
const Promise = require('bluebird');

// ESTABLISH CONNECTION WITH POSTGRES; DELETE EXISTING TABLES; AND CREATE NEW ONES
Promise.resolve(db.sequelize.authenticate())
  .then(() => {
    console.log('Connection with Postgre has been established successfully.');
  })
  .then(() => {
    // DELETE table elements
    return db.sequelize.query(queries[0]);
  })
  .then(() => {
    // DELETE table sections
    return db.sequelize.query(queries[1]);
  })
  .then(() => {
    // DELETE table courses
    return db.sequelize.query(queries[2]);
  })
  .then(() => {
    // CREATE table courses
    return db.sequelize.query(queries[3]);
  })
  .then(() => {
    // CREATE table sections
    return db.sequelize.query(queries[4]);
  })
  .then(() => {
    // CREATE table elements
    return db.sequelize.query(queries[5]);
  })
  .catch((error) => {
    console.log('An error has occurred:', error);
  });