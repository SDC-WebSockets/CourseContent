const uuidv4 = require('uuid');
const faker = require('faker');
const videosArray = require('./videosArray.js');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const pool = require('./db_PostgreSQL.js');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const numOfSubs = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const numOfCourses = 100;

const seedData = function() {

  for (let i = 0; i < numOfCourses; i++) {

    let numOfSections = numOfSubs([4, 5, 6, 7, 8, 9, 10]);
    let numOfElements = numOfSubs([1, 2, 3, 4]);

    let objCourse = {
      id: uuidv4(),
      courseId: i + 1,
      totalSections: numOfSections,
      totalLectures: 0,
      totalExercises: 0,
      totalArticles: 0,
      totalQuizzes: 0,
      courseLength: 0,
      updatedAt: new Date(),
    };

    for (let j = 0; j < numOfSections; j++) {
      let objSection = {
        id: uuidv4(),
        courseId: objCourse.id,
        title: faker.random.words(Math.floor(Math.random() * 10) + 1),
        sectionLength: 0,
        lectures: 0,
        quizzes: 0,
        exercises: 0,
        articles: 0,
        sequence: j + 1,
      };

      for (let k = 0; k < numOfElements; k++) {

        let objElement = {
          id: uuidv4(),
          courseId: objSection.courseId,
          sectionId: objSection.id,
          title: faker.git.commitMessage(),
          sequence: k + 1,
        };

        let options = ['lecture', 'lecture', 'lecture', 'lecture', 'quiz', 'quiz', 'exercise', 'quiz', 'exercise', 'exercise', 'exercise', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'article', 'article', 'article'];

        objElement.kind = options[Math.floor(Math.random() * options.length)];

        if (objElement.kind === 'lecture') {

          let videoIndex = Math.floor(Math.random() * videosArray.length);
          objElement['videoUrl'] = videosArray[videoIndex].url;
          objElement['videoPreview'] = (Math.random() * 100 > 20 ? false : true);
          objElement['summary'] = lorem.generateSentences(Math.floor(Math.random() * 2));
          objElement['elementLength'] = new Date(videosArray[videoIndex].duration + 1200000);
          objSection.lectures++;
          objSection.sectionLength += objElement.elementLength.getTime();
        } else if (objElement.kind === 'article') {
          objElement['summary'] = lorem.generateSentences(Math.floor(Math.random() * 2));
          objElement['elementLength'] = new Date(Math.floor(Math.random() * 600000));
          objSection.articles++;
          objSection.sectionLength += objElement.elementLength.getTime();
        } else if (objElement.kind === 'exercise') {
          objElement['numQuestions'] = Math.floor(Math.random() * 3) + 1;
          objElement['elementLength'] = new Date(Math.floor(Math.random() * 600000));
          objSection.exercises++;
        } else if (objElement.kind === 'quiz') {
          objElement['numQuestions'] = Math.floor(Math.random() * 3) + 1;
          objElement['elementLength'] = new Date(Math.floor(Math.random() * 600000));
          objSection.quizzes++;
        }

        const queryInsertElement = {
          text: 'INSERT INTO elements(id, courseid, sectionid, title, sequence, summary, videourl, videopreview, numquestions, elementlength) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
          values: [objElement.id, objElement.courseId, objElement.sectionId, objElement.title, objElement.sequence, objElement.summary, objElement.videoUrl, objElement.videoPreview, objElement.numQuestions, objElement.elementLength],
          rowMode: 'array'
        };

        pool.saveRecord(objSection, queryInsertElement);

      }

      objCourse.courseLength += objSection.sectionLength;
      objCourse.totalArticles += objSection.articles;
      objCourse.totalExercises += objSection.exercises;
      objCourse.totalLectures += objSection.lectures;
      objCourse.totalQuizzes += objSection.quizzes;
      objSection.sectionLength = new Date(objSection.sectionLength);

      const queryInsertSection = {
        text: 'INSERT INTO sections(id, courseid, title, sectionlength, lectures, quizzes, exercises, articles, sequence) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [objSection.id, objSection.courseId, objSection.title, objSection.sectionLength, objSection.lectures, objSection.quizzes, objSection.exercises, objSection.articles, objSection.sequence],
        rowMode: 'array'
      };

      pool.saveRecord(objSection, queryInsertSection);

    }

    objCourse.courseLength = new Date(objCourse.courseLength);

    const queryInsertCourse = {
      text: 'INSERT INTO courses(id, totalsections, totallectures, totalexercises, totalarticles, totalquizzes, courselength, updatedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [objCourse.id, objCourse.totalSections, objCourse.totalLectures, objCourse.totalExercises, objCourse.totalArticles, objCourse.totalQuizzes, objCourse.courseLength, objCourse.updatedAt],
      rowMode: 'array'
    };

    pool.saveRecord(objCourse, queryInsertCourse);
  }
  return;
};

seedData();