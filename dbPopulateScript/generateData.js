// Generate Database Model
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const moment = require('moment');
const faker = require('faker');
const config = require('./config.js');
const dbUrl = process.env.dbUrl || config.dbUrl || 'mongodb://localhost/courseContent';
const dbName = process.env.dbName || config.dbName;
const fs = require('fs');
const path = require('path');
const {checkIntegrity} = require('untegrity');
const AWS = require('aws-sdk');