const db = require('../database/index.js');
const helpers = require('./helpers.js');

module.exports.course = (req, res) => {

  db.findCourse(Number(req.query.courseId))
    .then((result) => {
      if (result.length === 0) {
        res.sendStatus(404);
      } else if (result.length > 1) {
        res.status(400);
        res.send('Multiple results found');
      } else {
        result = helpers.processCourses(result);
        res.send(result);
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(404);
        res.send(err);
      } else {
        res.sendStatus(404);
      }
    });

};

module.exports.section = (req, res) => {

  db.findSection(Number(req.query.sectionId))
    .then((result) => {
      if (result.length === 0) {
        res.sendStatus(404);
      } else if (result.length > 1) {
        res.status(400);
        res.send('Multiple results found');
      } else {
        result = helpers.processSection(result);
        res.send(result);
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(404);
        res.send(err);
      } else {
        res.sendStatus(404);
      }
    });

};

module.exports.element = (req, res) => {

  db.findElement(Number(req.query.elementId))
    .then((result) => {
      if (result.length === 0) {
        res.sendStatus(404);
      } else if (result.length > 1) {
        res.status(400);
        res.send('Multiple results found');
      } else {
        result = helpers.processElement(result);
        res.send(result);
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(404);
        res.send(err);
      } else {
        res.sendStatus(404);
      }
    });

};