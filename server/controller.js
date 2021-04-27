const db = require('../database/index.js');

module.exports.course = (req, res) => {

  db.findCourse(req.query.id)
    .then((result) => {
      res.send(result);
    });

};