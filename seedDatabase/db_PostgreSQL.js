const config = require('../config.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: config.userPG,
  password: config.password,
  port: 5432,
  host: 'localhost',
  database: config.pgdb
});

const saveRecord = function(obj, queryInsert) {
  const query = queryInsert;
  pool
    .query(query)
    .then(res => console.log('A record has been added to database successfully.'))
    .catch(e => console.error(e.stack));
};

module.exports.saveRecord = saveRecord;