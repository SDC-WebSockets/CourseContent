require('dotenv').config(`${__dirname}/.env`);
const db = require('../SDC/pg_db.js');

module.exports.searchCourse = function(courseId) {
  return db.sequelize.query(`SELECT * FROM courses_view WHERE "courseId" = ${courseId};`, {
    type: db.sequelize.QueryTypes.SELECT
  });
};

module.exports.searchSection = function(courseId) {
  return db.sequelize.query(`SELECT * FROM sections_view WHERE "courseId" = '${courseId}' ORDER BY "courseSequence";`, {
    type: db.sequelize.QueryTypes.SELECT
  });
};

module.exports.searchElement = function(courseId) {
  if (courseId >= 9000001 & courseId <= 9200000) {
    return db.sequelize.query(`SELECT * FROM elements_view_0 WHERE "courseId" = '${courseId}' ORDER BY "sectionId", "sectionSequence";`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (courseId >= 9200001 & courseId <= 9400000) {
    return db.sequelize.query(`SELECT * FROM elements_view_1 WHERE "courseId" = '${courseId}' ORDER BY "sectionId", "sectionSequence";`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (courseId >= 9400001 & courseId <= 9600000) {
    return db.sequelize.query(`SELECT * FROM elements_view_2 WHERE "courseId" = '${courseId}' ORDER BY "sectionId", "sectionSequence";`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (courseId >= 9600001 & courseId <= 9800000) {
    return db.sequelize.query(`SELECT * FROM elements_view_3 WHERE "courseId" = '${courseId}' ORDER BY "sectionId", "sectionSequence";`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  } else if (courseId >= 98000001 & courseId <= 10000000) {
    return db.sequelize.query(`SELECT * FROM elements_view_4 WHERE "courseId" = '${courseId}' ORDER BY "sectionId", "sectionSequence";`, {
      type: db.sequelize.QueryTypes.SELECT
    });
  }
};