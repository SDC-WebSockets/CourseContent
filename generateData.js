// Generate Database Model
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const moment = require('moment');
const faker = require('faker');
const config = require('./config.js');
const dbUrl = process.env.dbUrl || config.dbUrl || 'mongodb://localhost/courseContent';
const dbName = process.env.dbName || config.dbName;
const fs = require('fs');
const path = require('path');
const {checkIntegrity} = require('untegrity');
const AWS = require('aws-sdk');

mongoose.connect(dbUrl, {dbName: dbName});

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
    promises.push(Course.updateOne({ _id: i }, courses[i], {upsert: true}));
  }

  await Promise.all(promises);
  return 'added to mongoDb';

};

const randomFileName = () => {
  let alpha = 'qwertyuiopasdfghjklzxcvbnm';
  let string = '';

  for (let i = 0; i < 8; i++) {
    string += alpha[Math.floor(Math.random() * alpha.length)];
  }

  return string;
};

const findLowestQualityVideoUrl = (videos) => {
  let lowestVideoObjects = [];

  for (let i = 0; i < videos.length; i++) {
    let files = videos[i].video_files;

    let lowestQuality = files[0];

    for (let j = 0; j < files.length; j++) {
      if (files[j].height) {
        if (files[j].height < lowestQuality.height) {
          lowestQuality = files[j];

        }
      }
    }
    lowestQuality['title'] = videos[i].url.split('video')[1].split('/')[1] || randomFileName();
    lowestVideoObjects.push(lowestQuality);

  }


  return lowestVideoObjects;
};


const downloadVideo = async video => {
  let fileName = `${video.title}.${video.file_type.split('/')[1]}`;
  let url = video.link;

  const filePath = path.resolve(__dirname, 'videos', fileName);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', () => {
      fs.unlink(path.join(__dirname, 'videos', filename), () => {
        console.log(filename, 'unlinked');
        reject();
      });
    });
  });
};


let progressCounter = 0;
let errorCounter = 0;
let total = 0;
const saveToDirectory = (videos) => {
  let lowestQuality = findLowestQualityVideoUrl(videos);
  total += lowestQuality.length;


  for (let i = 0; i < lowestQuality.length; i++) {
    downloadVideo(lowestQuality[i])
      .then(() => {
        progressCounter++;
        console.log(`Success ${progressCounter}/${total}  Errors ${errorCounter}:  Processed ${lowestQuality[i].title}`);
      })
      .catch((err) => {
        if (err) {
          // console.log(err);
        }
        errorCounter++;
        console.log('Error Downloading Video');

      });
  }

  //   }
  // });

};


const searchMoreVideos = async (url) => {
  // console.log('- - - - - - - - -');
  // console.log('search', url);
  // console.log('- - - - - - - - -');

  await axios.get(url, { headers: { Authorization: `Bearer ${KEY}` } })
    .then((response) => {
      if (response.data.next_page) {
        setTimeout(() => {
          console.log('recurse');
          console.log(response.data.next_page)
          searchMoreVideos(response.data.next_page);
        }, 1000);
      }
      saveToDirectory(response.data.videos);
    })
    .catch((err) => {
      if (err) {

      }
      console.log('searchMore Error');
    });


};


const searchVideos = (addToDb = false) => {

  fs.rmdirSync('./videos', { recursive: true });

  fs.mkdirSync('./videos');

  client.videos.search({ query: 'web development', 'per_page': 80 })
    .then(response => {
      if (response.next_page) {
        setTimeout(() => {
          searchMoreVideos(response.next_page);
        }, 1000);
      }
      videosArray = response.videos;
      // console.log(response);
      let allCourses = countElements(generateAllCourses(100));

      return (addToDb ? addToDB(allCourses) : saveToDirectory(response.videos));
    })
    .then((response) => {
      // console.log(response);
      return;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      console.log('Process Complete with Errors');
    });
};

// searchVideos();

// const recurse = (n = 0) => {
//   console.log(n);
//   setTimeout(() => {
//     recurse(n + 1);
//   }, 1000);
// };

// recurse();

let status = {
  success: 0,
  error: 0,
  total: 0
};
const check = async (name, last) => {
  const filePath = path.join(__dirname, 'videos', name);
  console.log('Checking file:', filePath);
  const valid = await checkIntegrity(filePath);
  if (valid) {
    status.success++;
    console.log('Video Valid!');
    console.log(`${status.success}/${status.total}`);
  } else {
    fs.unlink(filePath, () => {
      status.error++;
      console.log('unlinked');
      console.log(`${status.error}/${status.total}`);
    });
  }
  if (last) {
    console.log('Integrity Check Complete');
    console.log(`${status.error + status.success} files processed of ${status.total} files`);
    console.log(`${status.success} passed`);
    console.log(`${status.error} deleted`);
  }
};

const checkAll = () => {
  fs.readdir('./videos', (err, files) => {
    status.total = files.length;
    for (let i = 0; i < files.length; i++) {
      check(files[i], i === files.length - 1);
    }
  });
};

// checkAll();

const awsId = config.accessKeyID;
const awsSecret = config.secretAccessKey;

const BUCKET_NAME = 'charlotte-badger-course-content-stock-footage';
// const BUCKET_NAME = 'test-bucket-lksjdfhgsldkfjgsdlfkjgndsflkgjnsd';

const s3 = new AWS.S3({
  accessKeyId: awsId,
  secretAccessKey: awsSecret
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: 'eu-west-2'
  }
};

// s3.createBucket(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log('Bucket Created Successfully', data.Location);
// });



const uploadOneFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'video/mp4'
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const uploadDirectory = (directory) => {
  console.log('files not read')
  console.log(directory);
  let files = fs.readdirSync(directory);
    console.log('files read')
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(directory, files[i]);
      uploadOneFile(filePath);
    }


};

uploadDirectory(path.join(__dirname, 'videos'));