const pexels = require('./pexels.js');
const save = require('./save.js');
const s3 = require('./s3.js');
const path = require('path');
const mongo = require('./mongo.js');
const { saveToDirectory } = require('./save.js');

const runScript = async () => {
  let videos = await pexels.searchVideos();
  await save.saveToDirectory(videos);
  await save.checkAll();
  await s3.emptyBucket();
  const urls = await s3.uploadDirectory(path.join(__dirname, 'videos'));
  const courses = mongo.generateAllCourses(urls);
  return await mongo.addToDB(courses);
};
runScript()
  .then((response) => {
    console.log(response);
  });