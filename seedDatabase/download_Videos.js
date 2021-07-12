const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const file = `${__dirname}/videos/downloadUrls.txt`;
const KEY = require('../config').pexelKey;

// READ (download.txt) AND STORE DOWNLOAD URLS TO A VARIABLE
const downloadUrls = JSON.parse(fs.readFileSync(file, 'utf8'));

// DOWNLOAD A SINGLE VIDEO BY AXIOS
const dlVideo = function (obj) {
  const fileName = obj.url.slice(29, obj.url.length - 1) + '.mp4';
  const filePath = `${__dirname}/videos/${fileName}`;
  let videoId = obj.id;
  const dlUrl = obj.url.slice(0, 29) + videoId + '/download';

  axios.get(dlUrl, {
    headers: {
      'X-API-KEY': KEY
    },
    responseType: 'stream'
  })
    .then(res => {
      if (!res) {
        throw res;
      }
      const writer = fs.createWriteStream(filePath);
      res.data.pipe(writer);
    })
    .catch(err => {
      console.log(err);
    });
};

// BATCH DOWNLOAD
// FREE TIER LIMIT 200/HR REQUEST TO PEXELS

const batchDL = function() {
  let start = 0;
  let end = 1200;

  for (let i = start; i < 1200; i += 200) {
    downloadUrls.slice(i, i + 200).forEach((obj, idx) => {
      dlVideo(obj);
      setTimeout(() => {
      }, 30000);
    });
  }
};

batchDL();

