const faker = require('faker');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const pool = require('./db_PostgreSQL.js');
const file = './videos/summary.txt';
const fs = require('fs');

const videosArray = JSON.parse(fs.readFileSync(file, 'utf8'));

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

const seedCourse = function(id) {

  let numOfSections = numOfSubs([4, 5, 6, 7, 8, 9, 10]);
  let numOfElements = numOfSubs([1, 2, 3, 4]);

  let objCourse = {
    courseId: id,
    totalSections: numOfSections,
    totalLectures: 0,
    totalExercises: 0,
    totalArticles: 0,
    totalQuizzes: 0,
    courseLength: 0,
    updatedAt: new Date(),
    sections: []
  };

  for (let j = 0; j < numOfSections; j++) {
    let objSection = {
      title: faker.random.words(Math.floor(Math.random() * 10) + 1),
      sectionLength: 0,
      lectures: 0,
      quizzes: 0,
      exercises: 0,
      articles: 0,
      sequence: j + 1,
      elements: []
    };

    for (let k = 0; k < numOfElements; k++) {

      let objElement = {
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

      objSection.elements.push(objElement);

    }

    objCourse.courseLength += objSection.sectionLength;
    objCourse.totalArticles += objSection.articles;
    objCourse.totalExercises += objSection.exercises;
    objCourse.totalLectures += objSection.lectures;
    objCourse.totalQuizzes += objSection.quizzes;
    objSection.sectionLength = new Date(objSection.sectionLength);
    objCourse.sections.push(objSection);

  }

  objCourse.courseLength = new Date(objCourse.courseLength);

  return objCourse;

};

const numOfCourses = 200000;

const seedData = () => {
  let courses = [];
  for (let i = 100000; i < numOfCourses + 1; i++) {
    let courseRecord = seedCourse(i);
    courses.push(courseRecord);
    console.log('Progress:', Math.round(i / numOfCourses * 100, 2).toString() + '%');
  }
  fs.appendFileSync('./copy_data/document1.json', JSON.stringify(courses, null, 2));
};

seedData();

// let records = fs.readFileSync('./copy_data/document.json', 'utf8');
// console.log(JSON.parse(records));