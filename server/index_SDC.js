/* eslint-disable camelcase */
require('dotenv').config(`${__dirname}/.env`);
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
    .then(courses => {
      if (!courses) {
        throw courses;
      }
      course.courseId = courses[0].course_id;
      course.courseLength = courses[0].course_length;
      course.totalArticles = courses[0].total_articles;
      course.totalExercises = courses[0].total_exercises;
      course.totalLectures = courses[0].total_lectures;
      course.totalQuizzes = courses[0].total_quizzes;
      course.totalSections = courses[0].total_sections;
      course.updatedAt = courses[0].updated_at;
      return searchSection(courses[0].id);
    })
    .then(sections => {
      course.sections = [];
      sections.forEach(section => {
        let obj = {};
        obj.sectionId = section.id;
        obj.title = section.title;
        obj.sectionLength = section.section_length;
        obj.lectures = section.lectures;
        obj.quizzes = section.quizzes;
        obj.articles = section.articles;
        obj.courseSequence = section.sequence;
        course.sections.push(obj);
      });
      return searchElement(sections[0].course_id);
    })
    .then(elements => {
      for (let i = 0; i < course.sections.length; i++) {
        course.sections[i].elements = [];
        for (let j = 0; j < elements.length; j++) {
          if (course.sections[i].sectionId === elements[j].section_id) {
            let obj = {};
            obj.elementId = elements[j].id;
            obj.kind = elements[j].kind;
            obj.title = elements[j].title;
            obj.sectionSequence = elements[j].sequence;
            if (elements[j].kind === 'lecture') {
              obj.videoUrl = elements[j].video_url;
              obj.videoPreview = elements[j].video_url.video_preview;
              obj.summary = elements[j].summary;
            }
            if (elements[j].kind === 'article') {
              obj.summary = elements[j].summary;
            }
            if (elements[j].kind === 'exercises' || elements[j].kind === 'quizzes') {
              obj.numQuestions = elements[j].num_questions;
            }
            obj.elementLength = elements[j].element_length;
            course.sections[i].elements.push(obj);
          }
        }
      }
      res.send(course);
    })
    .catch(error => {
      res.send(`An error has occurred: ${error}`);
    });
});

// POST REQUEST TO UPDATE TABLE courses ONLY
app.post('/create/course/item', (req, res) => {
  Promise.resolve(req.query.courseId)
    .then((courseId) => {
      if (!courseId) {
        throw courseId;
      }
      courseInsert['course_id'] = courseId;
      courseInsert['id'] = uuid.v4();
      return db.sequelize.query(`INSERT INTO courses (course_id, id, course_length, total_sections, total_lectures, total_exercises, total_articles, total_quizzes, updated_at) VALUES (${courseInsert['course_id']}, '${courseInsert['id']}', '${courseInsert['course_length']}', ${courseInsert['total_sections']}, ${courseInsert['total_lectures']}, ${courseInsert['total_exercises']}, ${courseInsert['total_articles']}, ${courseInsert['total_quizzes']}, '${courseInsert['updated_at']}')`, {
        type: db.sequelize.QueryTypes.INSERT
      });
    })
    .then(record => {
      res.send('A new course has been created successfully.');
    })
    .catch(error => {
      res.send(`An error has occurred: ${error}`);
    });
});


app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}...`);
});