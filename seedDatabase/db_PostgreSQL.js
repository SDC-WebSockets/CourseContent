const config = require('../config.js');
const { Pool } = require('pg');
const filePath = `${__dirname}/copy_data/courses.csv`;
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');

const pool = new Pool({
  user: config.userPG,
  password: config.password,
  port: 5432,
  host: 'localhost',
  database: config.pgdb
});
