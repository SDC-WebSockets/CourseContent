const pexels = require('./pexels.js');
const s3 = require('./s3.js');
const path = require('path');
const mongo = require('./mongo.js');

const runScript = async () => {
  await pexels.searchVideos();
  await s3.emptyBucket();
  const urls = await s3.uploadDirectory(path.join(__dirname, videos));
  const courses = mongo.generateAllCourses(urls);
  return await mongo.addToDB(courses);
};

console.log(runScript());