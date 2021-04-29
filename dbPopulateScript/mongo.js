mongoose.connect(dbUrl, { dbName: dbName });

const elementSchema = mongoose.Schema({
  _id: Number,
  typeOf: String,
  title: String,
  sectionSequence: Number,
  videoUrl: String,
  videoPreview: Boolean,
  thumbnailUrl: String,
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
  title: String,
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

const KEY = config.pexelKey;

const createClient = require('pexels').createClient;
const client = createClient(KEY);

let videosArray = [];
let videosCounter = 0;

let sectionIdCounter = 0;
let elementIdCounter = 0;


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


const generateElement = (i, j, k) => {

  let options = ['lecture', 'lecture', 'lecture', 'lecture', 'quiz', 'quiz', 'exercise', 'quiz', 'exercise', 'exercise', 'exercise', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'article', 'article', 'article'];

  let element = {
    _id: elementIdCounter,
    typeOf: options[Math.floor(Math.random() * options.length)],
    title: faker.git.commitMessage(),
    sectionSequence: k + 1
  };

  elementIdCounter++;

  if (element.typeOf === 'lecture') {

    element['videoUrl'] = videosArray[videosCounter].url;
    element['videoPreview'] = [true, false, false, false, false, true, false][Math.floor(Math.random() * 2)];
    element['thumbnailUrl'] = videosArray[videosCounter].image;
    element['summary'] = lorem.generateSentences(Math.floor(Math.random() * 2));
    element['elementLength'] = new Date(videosArray[videosCounter].duration * 1000);

    videosCounter++;
    videosCounter = videosCounter % videosArray.length;
  } else if (element.typeOf === 'article') {

    element['summary'] = lorem.generateSentences(Math.floor(Math.random() * 2));
    element['elementLength'] = new Date(Math.floor(Math.random() * 120000));

  } else if (element.typeOf === 'exercise') {
    element['numQuestions'] = Math.floor(Math.random() * 3) + 1;
  } else if (element.typeOf === 'quiz') {
    element['numQuestions'] = Math.floor(Math.random() * 3) + 1;
  }

  return element;

};

const generateSection = (course, i, j) => {

  let section = {
    _id: sectionIdCounter,
    title: faker.random.words(Math.floor(Math.random() * 10)),
    sectionLength: 0,
    lectures: 0,
    quizzes: 0,
    exercises: 0,
    articles: 0,
    courseSequence: j + 1,
    elements: []
  };

  sectionIdCounter++;

  for (let k = 0; k < Math.random() * 25; k++) {
    const newElement = generateElement(i, j, k);

    section.elements.push(newElement);

    if (newElement.elementLength) {
      section.sectionLength += newElement.elementLength.getTime();
    }

  }

  section.sectionLength = new Date(section.sectionLength);

  return section;

};

const generateCourse = (i) => {

  let course = {
    _id: i,
    title: faker.random.words(Math.floor(Math.random() * 10)),
    totalSections: (Math.floor(Math.random() * 45) + 5),
    totalLectures: 0,
    totalExercises: 0,
    totalArticles: 0,
    totalQuizzes: 0,
    courseLength: 0,
    updatedAt: new Date(),
    sections: []
  };

  for (let j = 0; j < course.totalSections; j++) {

    const newSection = generateSection(course, i, j);

    course.sections.push(newSection);

    course.courseLength += newSection.sectionLength.getTime();
  }

  course.courseLength = new Date(course.courseLength);

  return course;
};

const generateAllCourses = (num) => {

  let courses = [];

  for (let i = 0; i < num; i++) {

    courses.push(generateCourse(i));

  }

  return courses;
};


const countElements = (allCourses) => {

  for (let i = 0; i < allCourses.length; i++) {

    let currentCourse = allCourses[i];

    for (let j = 0; j < currentCourse.sections.length; j++) {

      let currentSection = currentCourse.sections[j];

      for (let k = 0; k < currentSection.elements.length; k++) {

        let currentElement = currentSection.elements[k];

        if (currentElement.typeOf === 'lecture') {
          currentCourse.totalLectures++;
          currentSection.lectures++;
        } else if (currentElement.typeOf === 'quiz') {
          currentCourse.totalQuizzes++;
          currentSection.quizzes++;
        } else if (currentElement.typeOf === 'exercise') {
          currentCourse.totalExercises++;
          currentSection.exercises++;
        } else if (currentElement.typeOf === 'article') {
          currentCourse.totalArticles++;
          currentSection.articles++;
        }

      }

    }

  }

  return allCourses;

};

let addToDB = async courses => {

  let promises = [];

  for (let i = 0; i < courses.length; i++) {
    promises.push(Course.updateOne({ _id: i }, courses[i], { upsert: true }));
  }

  await Promise.all(promises);
  return 'added to mongoDb';

};