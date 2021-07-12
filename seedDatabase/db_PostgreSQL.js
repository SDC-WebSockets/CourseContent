const config = require('../config.js');
const { Pool } = require('pg');
const fs = require('fs');
const courseFilePath = `${__dirname}/copy_data/courses.csv`;
const sectionFilePath = `${__dirname}/copy_data/sections.csv`;
const elementFilePath = './copy_data/elements.csv';

const pool = new Pool({
  user: config.userPG,
  password: config.password,
  port: 5432,
  host: 'localhost',
  database: config.pgdb
});
