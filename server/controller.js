const db = require('../database/index.js');
const helpers = require('./helpers.js');

module.exports.course = (req, res) => {

  db.findCourse(Number(req.query.id))
    .then((result) => {
      result = helpers.processCourse(result);
      console.log(result);
      res.send(result);
    });

};

module.exports.section = (req, res) => {

  db.findSection(Number(req.query.id))
    .then((result) => {
      result = helpers.processSection(result[0]);
      console.log(result);
      res.send(result[0]);
    });

};

module.exports.element = (req, res) => {
  console.log(req.query.id);

  db.findElement(Number(req.query.id))
    .then((result) => {
      result = helpers.processElement(result);
      console.log(result);
      res.send(result);
    });

};