const config = require('../config.js');
const KEY = config.pexelKey;
const createClient = require('pexels').createClient;
const client = createClient(KEY);
const fs = require('fs');
const path = require('path');
const save = require('./save.js');
const axios = require('axios');
const _ = require('lodash');

const gatherAllVideos = async (response) => {
  let videosArray = [];

  videosArray.push(response.videos);

  const recurse = async (url) => {
    await axios.get(url, { headers: { Authorization: `Bearer ${KEY}` } })
      .then((response) => {
        if (response.data.next_page) {
          setTimeout(() => {
            recurse(response.data.next_page);
          }, 1000);
        }
        videosArray.push(response.data.videos);
      })
      .catch((err) => {
        if (err) {

        }
        console.log('searchMore Error');
      });
  };

  if (response.next_page) {
    console.log('recurse');
    await recurse(response.next_page);
  }

  const flattened = _.flatten(videosArray);
  // console.log(flattened);
  return flattened;
};


module.exports.searchVideos = async (n = 0) => {

  fs.rmdirSync('./videos', { recursive: true });

  fs.mkdirSync('./videos');

  return await client.videos.search({ query: 'web development', 'per_page': 80 })
    .then(async response => {
      // if (response.next_page) {
      //   setTimeout(() => {
      //     searchMoreVideos(response.next_page);
      //   }, 1000);
      // }
      // console.log(response);
      // let allCourses = countElements(generateAllCourses(100));
      let videos = await gatherAllVideos(response);

      return videos;
    })
    .then((videos) => {
      let lowestQuality = save.findLowestQualityVideoUrl(videos);
      return lowestQuality;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      console.log('Process Complete with Errors');
    });
};