const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const file = './videos/download.txt';
const KEY = require('../config').pexelKey;

// READ (download.txt) AND STORE DOWNLOAD URLS TO A VARIABLE
const downloadUrls = JSON.parse(fs.readFileSync(file, 'utf8'));

// DOWNLOAD A VIDEO BY AXIOS
const dlVideo = function (url) {
  const fileName = url.slice(29, url.length - 1) + '.mp4';
  const filePath = `${__dirname}/videos/${fileName}`;
  let videoId = url.slice(-8);
  const dlUrl = url.slice(0, 29) + videoId + 'download';

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

const batchDL = function(start, end) {
  downloadUrls.slice(start, end).forEach((url, idx) => {
    dlVideo(url);
    setTimeout(() => {
    }, 30000);
  });
};

batchDL(600, 800);
