const path = require('path');
const search = require('./search.js');
const verify = require('./verify.js');
const s3 = require('./s3.js');
const generate = require('./generate.js');
const db = require('./db.js');

const runScript = async (dryRun = false) => {
  await search.searchVideos();
  await verify.checkAll();
  await s3.uploadDirectory(path.join(__dirname, 'videos'), dryRun);
  const response = await db.seedDB();
  console.log(response);
};

runScript();