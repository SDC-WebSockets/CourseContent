const mongoose = require('mongoose');
const generate = require('./generate.js');
let localConfig;
let config;
let dbUrl;
let dbName;

try {
  config = require('../config.js');
  dbUrl = process.env.dbUrl || config.dbUrl;
  dbName = process.env.dbName || config.dbName;
} catch (e) {
  localConfig = require('../localConfig.js');
  dbUrl = localConfig.dbUrl;
  dbName = localConfig.dbName;
}

mongoose.connect(dbUrl, {
  dbName: dbName,
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => {
  // Comment out this line if using local
  // mongoose.connection.db.dropDatabase();
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
  console.log(courses[0].sections[0].elements[2]);

  await Promise.all(promises);
  return 'added to mongoDb';
};