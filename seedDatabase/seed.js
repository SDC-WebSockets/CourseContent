const uuidv4 = require('uuid');
const faker = require('faker');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const pool = require('./db_PostgreSQL.js');
const fs = require('fs');
const videosArray = require('./videosArray.js');
const csvWriter = require('csv-write-stream');

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

const courseFilePath = `${__dirname}/copy_data/courses.csv`;
const sectionFilePath = `${__dirname}/copy_data/sections.csv`;
const elementFilePath = './copy_data/elements.csv';

const numOfSubs = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomKindWithProb = function() {
  const kinds = ['lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'exercise', 'exercise', 'quiz', 'article', 'article', 'article', 'quiz', 'lecture', 'lecture', 'exercise'];
  return kinds[Math.floor(Math.random() * kinds.length)];
};

const courseHeader = [
  'id',
  'course_length',
  'total_sections',
  'total_lectures',
  'total_exercises',
  'total_articles',
  'total_quizzes',
  'updated_at'
];

const sectionHeader = [
  'section_id',
  'course_id',
  'title',
  'section_length',
  'lectures',
  'quizzes',
  'exercises',
  'articles',
  'sequence'
];

const elementHeader = [
  'element_id',
  'id',
  'course_id',
  'section_id',
  'title',
  'kind',
  'video_url',
  'video_preview',
  'summary',
  'num_questions',
  'element_length',
  'sequence'
];

const writeRecord = async(obj, filePath) => {
  const writer = csvWriter( {sendHeaders: false} );
  writer.pipe(fs.createWriteStream(filePath, {flags: 'a'}));
  writer.write(obj);
  writer.end();
};

const seedElement = async(courseId, sectionId) => {
  let records = [];

  let length = 0;
  let lectureCount = 0;
  let quizCount = 0;
  let exerciseCount = 0;
  let articleCount = 0;

  let n = numOfSubs([1, 2, 3, 4]);

  for (let i = 0; i < n; i++) {
    let obj = {};
    obj['id'] = uuidv4();
    obj['course_id'] = courseId;
    obj['section_id'] = sectionId;
    obj.title = faker.random.words(Math.floor(Math.random() * 10) + 1);
    obj.kind = randomKindWithProb();
    obj.sequence = i + 1;

    if (obj.kind === 'lecture') {

      let videoIndex = Math.floor(Math.random() * videosArray.length);
      obj['video_url'] = videosArray[videoIndex];
      obj['video_preview'] = (Math.random() * 100 > 20 ? false : true);
      obj['summary'] = faker.lorem.sentence();
      obj['element_length'] = Math.floor(Math.random() * 100) + 1200000;
      lectureCount++;

    } else if (obj.kind === 'article') {

      obj['summary'] = lorem.generateSentences(Math.floor(Math.random() * 2));
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
    obj['element_length'] = new Date(obj['element_length']);
    obj['element_length'] = obj['element_length'].toDateString();

    await writeRecord({
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
    }, elementFilePath);

  }

  return [length, lectureCount, quizCount, exerciseCount, articleCount];

};

const seedSection = async (courseId) => {

  let n = numOfSubs([4, 5, 6, 7, 8, 9, 10]);

  let records = [];
  let length = 0;
  let lectureCount = 0;
  let exerciseCount = 0;
  let articleCount = 0;
  let quizCount = 0;

  for (let i = 0; i < n; i++) {
    let obj = {};
    obj['section_id'] = uuidv4();
    obj['course_id'] = courseId;
    obj['title'] = faker.git.commitMessage();
    [obj['section_length'], obj.lectures, obj.quizzes, obj.exercises, obj.articles] = await seedElement(courseId, obj['section_id']);
    obj['sequence'] = i + 1;

    length += obj['section_length'];
    lectureCount += obj.quizzes;
    exerciseCount += obj.exercises;
    articleCount += obj.articles;
    quizCount += obj.quizzes;

    obj['section_length'] = new Date(obj['section_length']);
    obj['section_length'] = obj['section_length'].toDateString();

    await writeRecord({
      'section_id': obj['section_id'],
      'course_id': obj['course_id'],
      'title': obj['title'],
      'section_length': obj['section_length'],
      'lectures': obj.lectures,
      'quizzes': obj.quizzes,
      'exercises': obj.exercises,
      'articles': obj.articles,
      'sequence': obj.sequence
    }, sectionFilePath);

  }

  return [length, n, lectureCount, exerciseCount, articleCount, quizCount];

};

const seedCourse = async(numOfCourses) => {

  for (let i = 1; i < numOfCourses; i++) {
    let obj = {};
    obj['id'] = uuidv4();
    [
      obj['course_length'],
      obj['total_sections'],
      obj['total_lectures'],
      obj['total_exercises'],
      obj['total_articles'],
      obj['total_quizzes']
    ] = await seedSection(obj['id']);
    obj['updated_at'] = new Date();
    obj['updated_at'] = obj['updated_at'].toDateString();
    obj['course_length'] = new Date(obj['course_length']);
    obj['course_length'] = obj['course_length'].toDateString();

    await writeRecord({
      'id': obj.id,
      'course_length': obj['course_length'],
      'total_sections': obj['total_sections'],
      'total_lectures': obj['total_lectures'],
      'total_exercises': obj['total_exercises'],
      'total_articles': obj['total_articles'],
      'total_quizzes': obj['total_quizzes'],
      'updated_at': obj['updated_at']
    }, courseFilePath);
  }
  return;
};

const numOfCourses = Math.pow(10, 7);

seedCourse(numOfCourse);