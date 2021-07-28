require('dotenv').config({path: '../.env'});
const fs = require('fs');
const Promise = require('bluebird');
const createClient = require('pexels').createClient;
const client = createClient(process.env.PEXEL_KEY);

let uploads = [];
let downloads = [];
let videos = [];

// WRITE DOWNLOAD URLS AND S3 URLS INTO 2 TXT FILES
populateVideos = function(pageNo, perPage, query, f1, f2) {
  Promise.resolve(client.videos.search({ query, 'per_page': perPage, page: pageNo, orientation: 'landscape' }))
    .tap(records => {
      if (!records) {
        throw records;
      }
      records.videos.forEach(video => {
        videos.push(video.url);
      });
    })
    .then(records => {
      records.videos.forEach(video => {
        if (!videos.include(video.url)) {
          const download = { id: video.id, url: video.url };
          downloads.push(data);

          const newUrl = 'https://sdc-coursecontent.s3.amazonaws.com/' + video.url.slice(29, video.url.length - 1) + '.mp4';
          let upload = { id: video.id, url: newUrl, duration: video.duration };
          uploads.push(data);
        }
      });
    })
    .then( () => {
      fs.appendFileSync(f1, JSON.stringify(uploads));
    })
    .then( () => {
      fs.appendFileSync(f2, JSON.stringify(downloads));
    })
    .catch(err => {
      console.log(err);
    });
};

// POPULATE URLS FOR 1200 (POPULATE MORE IN CASE THERE ARE DUPLICATES) VIDEOS (DOWNLOAD THEN UPLOAD)
const seedVideos = function() {
  let f1 = `${__dirname}/videos/uploadUrls.txt`;
  let f2 = `${__dirname}/videos/downloadUrls.txt`;
  const queries = ['art', 'sport', 'computer', 'dog'];

  for (let i = 1; i < 21; i++) {
    if (i < 6) {
      let query = queries[0];
    } else if (i >= 6 && i < 11) {
      let query = queries[1];
    } else if (i >= 11 && i < 16) {
      let query = queries[2];
    } else if (i >= 16 && i < 21) {
      let query = queries[3];
    }
    populateVideos(i, 60, query, f1, f2);
  }
};

seedVideos();

