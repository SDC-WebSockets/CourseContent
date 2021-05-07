const path = require('path');
const search = require('./search.js');
const verify = require('./verify.js');
const s3 = require('./s3.js');
const generate = require('./generate.js');
const db = require('./db.js');

const runScript = async (isLocal = false) => {
  if (!isLocal) {
    await search.searchVideos();
    await verify.checkAll();
  }
  await s3.uploadDirectory(path.join(__dirname, 'videos'), isLocal);
  const response = await db.seedDB();
  console.log(response);
};

// If seeding to local database, set argument to true. Uncomment lines 14-19 in db.js.
// If seeing to remote database, uncomment lines 15-19 and line 29 in db.js and set argument to false. Make sure that dbUrl and dbName are set in ../config.js
runScript();