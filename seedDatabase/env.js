const fs = require('fs');
const path = require('path');
const variablePairs = {
  PEXEL_KEY: 'pexelKey',
  DBNAME: 'dbName',
  DBURL: 'dbUrl',
  AWS_ACCESS_KEY_ID: 'accessKeyID',
  AWS_SECRET_ACCESS_KEY: 'secretAccessKey'
};
const envKeys = Object.keys(variablePairs);

module.exports.setKeys = () => {

  for (let i = 0; i < envKeys.length; i++) {
    let variable = envKeys[i];
    if (!process.env[variable]) {
      if (fs.existsSync(path.join(__dirname, '..', 'config.js'))) {
        if (require('../config.js')[variablePairs[variable]]) {
          process.env[variable] = require('../config.js')[variablePairs[variable]];
        } else {
          console.log(`Please set ${variablePairs[variable]} in config.js`);
        }
      }
    }
  }

};