const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const generate = require('./generate.js');
const config = require('./config.js');
const dbUrl = process.env.dbUrl || config.dbUrl || 'mongodb://localhost/courseContent';
const dbName = process.env.dbName || config.dbName;

mongoose.connect(dbUrl, { dbName: dbName }, () => {
  mongoose.connection.db.dropDatabase();
});

const elementSchema = mongoose.Schema({
  _id: Number,
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
  _id: Number,
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
  _id: Number,
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


///////////////////////////////////////////////////////////////////
////////////////// Top Level Function Calls ///////////////////////
///////////////////////////////////////////////////////////////////




const updateOne = (i, course) => {
  return Course.updateOne({ _id: i }, course, { upsert: true }).exec();
};

module.exports.addToDB = async () => {
  let courses = await generate.countElements(await generate.generateAllCourses(100));

  var promises = [];

  for (let i = 0; i < courses.length; i++) {
    let promise = updateOne(i, courses[i]);
    promises.push(promise);
  }

  await Promise.all(promises);
  return 'added to mongoDb';
};