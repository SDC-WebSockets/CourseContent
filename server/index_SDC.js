/* eslint-disable camelcase */
require('dotenv').config(`${__dirname}/.env`);
require('newrelic');
const path = require('path');
const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { searchCourse, searchSection, searchElement } = require('./controller_SDC.js');
const shrinkRay = require('shrink-ray-current');
const db = require('../SDC/pg_db.js');
const uuid = require('uuid');
const PORT = process.env.PORT || 9800;
const { courseInsert, sectionsInsert, elementsInsert } = require('./sample.js');

const app = express();
app.use(shrinkRay());
app.use(express.static(path.join(__dirname, '../client/dist'), {maxAge: '30d'}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.get('/course/item', (req, res) => {

  let course = {};

  Promise.resolve(req.query.courseId)
    .then(courseId => {
      if (!courseId) {
        throw courseId;
      }
      return searchCourse(courseId);
    })
    .then(record => {
      if (!record) {
        throw record;
      }
      course = record[0];
      return searchSection(course.courseId);
    })
    .then(records => {
      if (!records) {
        throw records;
      }
      course.sections = records;
      return searchElement(course.courseId);
    })
    .then(records => {
      course.sections.forEach(section => {
        section.elements = [];
        records.forEach(element => {
          if (element.sectionId === section.sectionId) {
            section.elements.push(element);
          }
        });
      });
      res.json(course);
    })
    .catch((error) => {
      res.send(`An error has occurred: ${error}`);
    });
});

// POST REQUEST TO UPDATE TABLE courses ONLY



app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}...`);
});