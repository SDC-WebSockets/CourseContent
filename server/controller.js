const db = require('../database/index.js');

module.exports.course = (req, res) => {
  console.log('server');

  db.findCourse()
    .then((response) => {
      console.log('response');
      console.log(response);
    });


};