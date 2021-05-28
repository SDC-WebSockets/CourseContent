const mongoose = require('mongoose');
const generate = require('./generate.js');
const db = require('../database/index.js');
const fs = require('fs');
const path = require('path');
const local = require('./local.js');
let dbUrl = process.env.DBURL;
let dbName = process.env.DBNAME;

mongoose.connect(dbUrl, {
  dbName: dbName,
  useUnifiedTopology: true,
  useNewUrlParser: true
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
}, { versionKey: false });

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
}, { versionKey: false });

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
}, { versionKey: false });

const Course = db.Course;

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