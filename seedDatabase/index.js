// require('./env.js').setKeys();
const path = require('path');
const search = require('./search.js');
const verify = require('./verify.js');
const s3 = require('./s3.js');
const db = require('./db.js');

// In order to run script, add file "config.js" to root directory. It should contain an object with the following format:

// module.exports = {
//   dbUrl: // Database Url,
//   dbName: // Database Name,
//   accessKeyID: // S3 Access Key,
//   secretAccessKey: // S3 Secret Access Key,
//   pexelKey: // Key for pexel API. If you want to use mine it's pinned on the Charlotte-Badger Slack Channel
// };

// You may want to change 'numberOfVideos' on line 7 of search.js to a smaller number. This is the number of unique videos that will be downloaded (at lowest possible quality), but may take up more room in your S3 bucket. (Note: All elements requiring a video will have a video as long as this number is greater than 1. This number just determines the variety of videos that the service will display).

// If you would prefer to run this script using environment variables rather than the values set in '../config.js', refactor all declarations that use 'require('../config.js)...' to 'process.env...' and uncomment line 1.

// When setup, run 'npm run seed'

const runScript = async (isLocal = false) => {
  if (!isLocal) {
    await search.searchVideos();
    await verify.checkAll();
    await s3.uploadDirectory(path.join(__dirname, 'videos'), isLocal);
  }

  const response = await db.seedDB();
  console.log();
  console.log(response);
  process.exit();
};

runScript();
