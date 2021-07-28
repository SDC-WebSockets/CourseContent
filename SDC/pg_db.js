require('dotenv').config({path: '../.env'});
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    multipleStatements: true
  }
});


module.exports.sequelize = sequelize;


