const db = require('../database/index.js');
const helpers = require('./helpers.js');

module.exports.course = (req, res) => {
  console.log(req.query)

  db.findCourse(req.query.courseId)
    .then((result) => {
      console.log(result[0]);
      delete result._id;
      res.send(result);
    });

};