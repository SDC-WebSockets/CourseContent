const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const generate = require('./generate.js');
const config = require('../config.js');
const dbUrl = process.env.dbUrl || config.dbUrl || 'mongodb://localhost/courseContent';
const dbName = process.env.dbName || config.dbName;

mongoose.connect(dbUrl, { dbName: dbName }, () => {
  mongoose.connection.db.dropDatabase();
});

const elementSchema = mongoose.Schema({
  elementId: Number,
  kind: String,
  title: String,
  sectionSequence: Number,
  videoUrl: String,
  videoPreview: Boolean,
  summary: String,
  elementLength: Date,
  numQuestions: Number
});

const sectionSchema = mongoose.Schema({
  sectionId: Number,
  title: String,
  sectionLength: Date,
  lectures: Number,
  exercises: Number,
  quizzes: Number,
  articles: Number,
  courseSequence: Number,
  elements: [elementSchema]
});

const courseSchema = mongoose.Schema({
  courseId: Number,
  totalSections: Number,
  totalLectures: Number,
  totalExercises: Number,
  totalArticles: Number,
  totalQuizzes: Number,
  courseLength: Date,
  updatedAt: Date,
  sections: [sectionSchema]
});

const Course = mongoose.model('Course', courseSchema);


const updateOne = (course) => {
  return Course.updateOne({ courseId: course.courseId }, course, { upsert: true }).exec();
};

module.exports.seedDB = async () => {
  let courses = generate.generateAllCourses(100);

  var promises = [];

  for (let i = 0; i < courses.length; i++) {
    let promise = updateOne(courses[i]);
    promises.push(promise);
  }

  await Promise.all(promises);
  return 'added to mongoDb';
};