require('dotenv').config(`${__dirname}/.env`);
const db = require('../SDC/pg_db.js');

module.exports.searchCourse = function(courseId) {
  return db.sequelize.query(`SELECT * FROM courses WHERE course_id = ${courseId};`, {
    type: db.sequelize.QueryTypes.SELECT
  });
};

module.exports.searchSection = function(courseId) {
  return db.sequelize.query(`SELECT * FROM sections WHERE course_id = '${courseId}' ORDER BY sequence;`, {
    type: db.sequelize.QueryTypes.SELECT
  });
};

module.exports.searchElement = function(courseId) {
  return db.sequelize.query(`SELECT * FROM elements WHERE course_id = '${courseId}' ORDER BY section_id, sequence ASC;`, {
    type: db.sequelize.QueryTypes.SELECT
  });
};