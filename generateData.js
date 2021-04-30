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
const ffmpeg = require('fluent-ffmpeg');

mongoose.connect(dbUrl, {dbName: dbName}, () => {
  mongoose.connection.db.dropDatabase();
});

const elementSchema = mongoose.Schema({
  _id: Number,
  typeOf: String,
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

const KEY = config.pexelKey;

const createClient = require('pexels').createClient;
const client = createClient(KEY);

let videosArray = [];
let videosCounter = 0;
let videosUrlsArray = [];

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
    // element['thumbnailUrl'] = videosArray[videosCounter].image;
    element['summary'] = lorem.generateSentences(Math.floor(Math.random() * 2));
    element['elementLength'] = new Date(videosArray[videosCounter].duration);

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

const countElements = async (allCourses) => {
  
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
const saveToDirectory = async (videos) => {
  let lowestQuality = findLowestQualityVideoUrl(videos);
  total += lowestQuality.length;

  for (let file of lowestQuality) {
    await downloadVideo(file)
      .then(() => {
        progressCounter++;
        console.log(`Success ${progressCounter}/${total}  Errors ${errorCounter}:  Processed ${file.title}`);
      })
      .catch((err) => {
        if (err) {
          // console.log(err);
        }
        errorCounter++;
        console.log('Error Downloading Video');

      });
  }

};

const searchAdditionalVideos = async (url) => {

  await axios.get(url, { headers: { Authorization: `Bearer ${KEY}` } })
    .then((response) => {
      if (response.data.next_page) {
        setTimeout(() => {
          console.log('recurse');
          console.log(response.data.next_page);
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

const searchVideos = async (addToDb = false) => {

  fs.rmdirSync('./videos', { recursive: true });

  fs.mkdirSync('./videos');

  await client.videos.search({ query: 'programming', 'per_page': 80 })
    .then(async response => {
      // if (response.next_page) {
      //   setTimeout(() => {
      //     searchAdditionalVideos(response.next_page);
      //   }, 1000);
      // }

      return await saveToDirectory(response.videos);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      console.log('Process Complete with Errors');
    });
};

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

const checkAll = async () => {
  console.log('Checking file integrity');
  let files = fs.readdirSync('./videos');

  status.total = files.length;
  for (let file of files) {
    await check(file);
  }
    
  // return;

  // console.log('for loop')
};

const awsId = config.accessKeyID;
const awsSecret = config.secretAccessKey;

const BUCKET_NAME = 'charlotte-badger-course-content-stock-footage';

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

const emptyBucket = async () => {

  const {Contents} = await s3.listObjects({Bucket: BUCKET_NAME}).promise();
  if (Contents.length > 0) {
    await s3.deleteObjects({
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: Contents.map(({ Key }) => ({ Key }))
      }
    })
      .promise();
  }

  return true;


};

const uploadOneFile = async (file) => {
  // Read content from the file
  console.log('Uploading:', file);
  const fileContent = fs.readFileSync(file);
  let fileName = file.split('/');
  fileName = fileName[fileName.length - 1];

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'video/mp4'
  };

  // Uploading files to the bucket
  return await s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    return `Uploaded: ${data.key}`;
  }).promise();
};

const uploadDirectory = async (directory) => {
  await emptyBucket();
  console.log('Beginning upload to S3');
  let files = fs.readdirSync(directory);
  for (let file of files) {
    const filePath = path.join(directory, file);
    await uploadOneFile(filePath)
      .then(async (result) => {
        console.log(`Uploaded ${result.key}`);
        ffmpeg.ffprobe(filePath, function(err, metadata) {
          let duration = Math.floor(metadata.format.duration * 1000);
          let obj = {
            url: result.Location,
            duration: duration
          };
          videosArray.push(obj);
        });
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        console.log('Upload failed');
      });
  }

  return 'Upload to S3 Complete!';
};

const listContents = async () => {
  let fileUrls = [];

  const { Contents } = await s3.listObjects({ Bucket: BUCKET_NAME }).promise();
  // console.log(Contents);
  for (let i = 0; i < Contents.length; i++) {
    let url = `https://${BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${Contents[i].Key}`;
    fileUrls.push(url);
  }

  return fileUrls;
};

// emptyBucket();

// listContents()
//   .then((result) => {
//     // console.log(result);
//   });


const generateAllCourses = async (num) => {

  const response = await uploadDirectory(path.join(__dirname, 'videos'));
  console.log(response);

  let courses = [];

  // console.log(videosArray);
  
  for (let i = 0; i < num; i++) {
  
    courses.push(generateCourse(i));
  
  }
  
  return courses;
};

const updateOne = (i, course) => {

  return Course.updateOne({ _id: i }, course, {upsert: true}).exec();

};

let addToDB = async () => {

  let courses = await countElements(await generateAllCourses(100));

  var promises = [];

  for (let i = 0; i < courses.length; i++) {
    let promise = updateOne(i, courses[i]);
    promises.push(promise);
  }

  await Promise.all(promises);
  return 'added to mongoDb';

};

const runScript = async () => {

  await searchVideos();
  let now = Date.now();
  await checkAll();
  console.log(Date.now() - now);
  const response = await addToDB();
  console.log(response);

};

runScript();