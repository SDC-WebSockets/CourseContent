const db = require('../database/index.js');
const helpers = require('./helpers.js');

module.exports.course = (req, res) => {

  db.findCourse(Number(req.query.courseId))
    .then((result) => {
      result = helpers.processCourses(result);
      res.send(result);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send(err);
      } else {
        res.sendStatus(400);
      }
    });

};

module.exports.section = (req, res) => {

  db.findSection(Number(req.query.sectionId))
    .then((result) => {
      result = helpers.processSection(result);
      res.send(result);
    });

};

module.exports.element = (req, res) => {

  db.findElement(Number(req.query.elementId))
    .then((result) => {
      result = helpers.processElement(result);
      res.send(result);
    });

};