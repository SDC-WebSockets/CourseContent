require('dotenv').config({path: '../.env'});
const uuid = require('uuid');
const faker = require('faker');
const videosArray = require('./videosArray.js');
const TaskTimer = require('tasktimer').TaskTimer;
const utils = require('./utilities.js');
const { exec } = require('child_process');
const db = require('./pg_db.js');

const seedElement = async(courseId, sectionId, filePathElement) => {

  let length = 0;
  let lectureCount = 0;
  let quizCount = 0;
  let exerciseCount = 0;
  let articleCount = 0;

  let n = utils.numOfSubs([1, 2, 3, 4]);

  for (let i = 0; i < n; i++) {
    let obj = {};
    obj['id'] = uuid.v4();
    obj['course_id'] = courseId;
    obj['section_id'] = sectionId;
    obj.title = faker.random.words(Math.floor(Math.random() * 10) + 1);
    obj.kind = utils.randomKindWithProb();
    obj.sequence = i + 1;

    if (obj.kind === 'lecture') {

      let videoIndex = Math.floor(Math.random() * videosArray.length);
      obj['video_url'] = videosArray[videoIndex];
      obj['video_preview'] = (Math.random() * 100 > 20 ? false : true);
      obj['summary'] = faker.lorem.sentence();
      obj['element_length'] = Math.floor(Math.random() * 100) + 1200000;
      lectureCount++;

    } else if (obj.kind === 'article') {

      obj['summary'] = utils.lorem.generateSentences(Math.floor(Math.random() * 2));
      obj['element_length'] = Math.floor(Math.random() * 600000);
      articleCount++;

    } else if (obj.kind === 'exercise') {

      obj['num_questions'] = Math.floor(Math.random() * 3) + 1;
      obj['element_length'] = Math.random() * 100 > 50 ? 900000 : 1200000;
      exerciseCount++;

    } else if (obj.kind === 'quiz') {

      obj['num_questions'] = Math.floor(Math.random() * 3) + 1;
      obj['element_length'] = Math.random() * 100 > 50 ? 1800000 : 1200000;
      quizCount++;
    }

    length += obj['element_length'];
    obj['element_length'] = new Date(obj['element_length']).toISOString();

    await utils.writeRecord({
      'id': obj.id,
      'course_id': obj['course_id'],
      'section_id': obj['section_id'],
      'title': obj.title,
      'kind': obj.kind,
      'video_url': obj['video_url'],
      'video_preview': obj['video_preview'],
      'summary': obj.summary,
      'num_questions': obj['num_questions'],
      'element_length': obj['element_length'],
      'sequence': obj.sequence
    }, filePathElement);

  }

  return [length, lectureCount, quizCount, exerciseCount, articleCount];

};

const seedSection = async (courseId, filePathElement, filePathSection) => {

  let n = utils.numOfSubs([4, 5, 6, 7, 8, 9, 10]);

  let length = 0;
  let lectureCount = 0;
  let exerciseCount = 0;
  let articleCount = 0;
  let quizCount = 0;

  for (let i = 0; i < n; i++) {
    let obj = {};
    obj['id'] = uuid.v4();
    obj['course_id'] = courseId;
    obj['title'] = faker.git.commitMessage();
    [obj['section_length'], obj.lectures, obj.quizzes, obj.exercises, obj.articles] = await seedElement(courseId, obj['id'], filePathElement);
    obj['sequence'] = i + 1;

    length += obj['section_length'];
    lectureCount += obj.quizzes;
    exerciseCount += obj.exercises;
    articleCount += obj.articles;
    quizCount += obj.quizzes;

    obj['section_length'] = new Date(obj['section_length']).toISOString();

    await utils.writeRecord({
      'id': obj['id'],
      'course_id': obj['course_id'],
      'title': obj['title'],
      'section_length': obj['section_length'],
      'lectures': obj.lectures,
      'quizzes': obj.quizzes,
      'exercises': obj.exercises,
      'articles': obj.articles,
      'sequence': obj.sequence
    }, filePathSection);

  }

  return [length, n, lectureCount, exerciseCount, articleCount, quizCount];

};

const seedCourse = async(numOfCourses, filePathElement, filePathSection, filePathCourse) => {

  for (let i = 0; i < numOfCourses; i++) {
    let obj = {};
    obj['id'] = uuid.v4();

    [
      obj['course_length'],
      obj['total_sections'],
      obj['total_lectures'],
      obj['total_exercises'],
      obj['total_articles'],
      obj['total_quizzes']
    ] = await seedSection(obj['id'], filePathElement, filePathSection);

    obj['updated_at'] = utils.randomDate(new Date(2010, 1, 1), new Date()).toISOString();
    obj['course_length'] = new Date(obj['course_length']).toISOString();

    await utils.writeRecord({
      'id': obj.id,
      'course_length': obj['course_length'],
      'total_sections': obj['total_sections'],
      'total_lectures': obj['total_lectures'],
      'total_exercises': obj['total_exercises'],
      'total_articles': obj['total_articles'],
      'total_quizzes': obj['total_quizzes'],
      'updated_at': obj['updated_at']
    }, filePathCourse);
  }
  console.log('DONE');
  return;
};

// SEEDING PIPELINE
// BATCH = NUMBER OF COURSES GENERATED ONE TIME
// RUNS = HOW MANY TIMES THE SEEDING SCRIPT IS GOING RUN
// RUN node pg_index.js IN WD BEFORE SEEDING
// BATCH, RUNS AND HRS CAN BE TWEAKED AND CUSTOMIZED

const batch = 1000;
const timer = new TaskTimer(1000);
const runs = 500;
const hrs = 0.05;

timer.add([
  {
    id: 'TASK-1: CREATE AN EMPTY FOLDER',
    tickInterval: 1,
    totalRuns: 1,
    callback(task) {
      exec(`mkdir -p '${process.env.FILE_PATH}'`, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        }
        console.log(`${task.id} has run ${task.currentRuns} times.`);
      });
    }
  },
  {
    id: `TASK-2: SEED ${batch} COURSES AND WRITE CSV FILES`,
    tickInterval: 10,
    totalRuns: runs,
    callback(task) {
      let filePathElement = `${process.env.FILE_PATH}/elements${task.currentRuns}.csv`;
      let filePathSection = `${process.env.FILE_PATH}/sections${task.currentRuns}.csv`;
      let filePathCourse = `${process.env.FILE_PATH}/courses${task.currentRuns}.csv`;
      seedCourse(batch, filePathElement, filePathSection, filePathCourse);
      console.log(`${task.id} has run ${task.currentRuns} times.`);
    }
  },
  {
    id: `TASK-3: IMPORT ${batch} COURSES INTO POSTGRES`,
    tickDelay: 10 * runs + 5,
    tickInterval: 10,
    totalRuns: runs,
    callback(task) {
      let filePathElement = `${process.env.FILE_PATH}/elements${task.currentRuns}.csv`;
      let filePathSection = `${process.env.FILE_PATH}/sections${task.currentRuns}.csv`;
      let filePathCourse = `${process.env.FILE_PATH}/courses${task.currentRuns}.csv`;
      let copyCourseQuery = `COPY courses(id, course_length, total_sections, total_lectures, total_exercises, total_articles, total_quizzes, updated_at) FROM '${filePathCourse}' DELIMITER ',';`;
      let copySectionQuery = `COPY sections (id, course_id, title, section_length, lectures, quizzes, exercises, articles, sequence) FROM '${filePathSection}' DELIMITER ',';`;
      let copyElementQuery = `COPY elements(id, course_id, section_id, title, kind, video_url, video_preview, summary, num_questions, element_length, sequence) FROM '${filePathElement}' DELIMITER ',' CSV ESCAPE '/';`;
      Promise.resolve(db.sequelize.authenticate())
        .then(() => {
          return db.sequelize.query(copyCourseQuery);
        })
        .then(() => {
          return db.sequelize.query(copySectionQuery);
        })
        .then(() => {
          return db.sequelize.query(copyElementQuery);
        })
        .catch((error) => {
          console.log('An error has occurred:', error);
        });
    }
  },
  {
    id: 'TASK-4: DELETE IMPORTED FILES',
    tickDelay: 2 * (10 * runs) + 10, // tickDelay = time(task-1) + time(task-2) + time(task-3) + 5
    tickInterval: 1,
    totalRuns: 1,
    callback(task) {
      exec(`rm -rf '${process.env.FILE_PATH}'`, (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        }
        console.log(`${task.id} has run ${task.currentRuns} times.`);
      });
    }
  }
]);

timer.on('tick', () => {
  console.log('tick count: ' + timer.tickCount);
  console.log('elapsed time: ' + timer.time.elapsed + ' ms.');
  if (timer.tickCount >= 2 * (10 * runs) + 20) {
    timer.stop();
  }
});

timer.start();
