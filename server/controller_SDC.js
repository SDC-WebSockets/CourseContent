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

module.exports.searchElement = function(id, courseId) {
  if (id >= 9000001 & id <= 9400000) {
    return db.sequelize.query(`SELECT * FROM elements1 WHERE course_id = '${courseId}' ORDER BY section_id, sequence ASC;`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (id >= 9400001 & id <= 9600000) {
    return db.sequelize.query(`SELECT * FROM elements2 WHERE course_id = '${courseId}' ORDER BY section_id, sequence ASC;`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (id >= 9600001 & id <= 9800000) {
    return db.sequelize.query(`SELECT * FROM elements3 WHERE course_id = '${courseId}' ORDER BY section_id, sequence ASC;`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (id >= 9800001 & id <= 10000000) {
    return db.sequelize.query(`SELECT * FROM elements4 WHERE course_id = '${courseId}' ORDER BY section_id, sequence ASC;`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  }
};