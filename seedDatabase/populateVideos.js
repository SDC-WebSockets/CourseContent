const fs = require('fs');
const Promise = require('bluebird');
const KEY = require('../config').pexelKey;
const createClient = require('pexels').createClient;
const client = createClient(KEY);
const query = 'computer';
let summary = [];
let download = [];

// WRITE DOWNLOAD URLS AND S3 URLS INTO 2 TXT FILES
populateVideos = function(pageNo, perPage) {
  Promise.resolve(client.videos.search({ query, 'per_page': perPage, page: pageNo, orientation: 'landscape' }))
    .tap(records => {
      if (!records) {
        throw records;
      }
      records.videos.forEach(video => {
        const newUrl = 'https://sdc-coursecontent.s3.amazonaws.com/' + video.url.slice(29, video.url.length - 1) + '.mp4';
        let data = { id: video.id, url: newUrl, duration: video.duration };
        summary.push(data);
      });
    })
    .then(records => {
      records.videos.forEach(video => {
        let data = { id: video.id, url: video.url };
        download.push(data);
      });
    })
    .then( () => {
      fs.writeFile('./videos/summary.txt', JSON.stringify(summary), (err) => {
        if (err) {
          throw err;
        }
      });
    })
    .then( () => {
      fs.writeFile('./videos/download.txt', JSON.stringify(download), (err) => {
        if (err) {
          throw (err);
        }
      });
    })
    .catch(err => {
      throw err;
    });
};

// POPULATE URLS FOR 1,000 VIDEOS (DOWNLOAD THEN UPLOAD)
for (let i = 1; i < 21; i++) {
  populateVideos(i, 50);
}

