const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const KEY = config.pexelKey;
const createClient = require('pexels').createClient;
const client = createClient(KEY);
const axios = require('axios');

///////////////////////////////////////////////////////////////////
///////////// Download Stock Footage from Pexels //////////////////
///////////////////////////////////////////////////////////////////

const randomFileName = () => {
  let alpha = 'qwertyuiopasdfghjklzxcvbnm';
  let string = '';

  for (let i = 0; i < 8; i++) {
    string += alpha[Math.floor(Math.random() * alpha.length)];
  }

  return string;
};

const findLowestQualityVideoUrl = (videos) => {
  let lowestVideoObjects = [];

  for (let i = 0; i < videos.length; i++) {
    let files = videos[i].video_files;

    let lowestQuality = files[0];

    for (let j = 0; j < files.length; j++) {
      if (files[j].height) {
        if (files[j].height < lowestQuality.height) {
          lowestQuality = files[j];
        }
      }
    }
    lowestQuality['title'] = videos[i].url.split('video')[1].split('/')[1] || randomFileName();
    lowestVideoObjects.push(lowestQuality);

  }

  return lowestVideoObjects;
};

const downloadVideo = async video => {
  let fileName = `${video.title}.${video.file_type.split('/')[1]}`;
  let url = video.link;

  const filePath = path.resolve(__dirname, 'videos', fileName);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', () => {
      fs.unlink(path.join(__dirname, 'videos', filename), () => {
        console.log(filename, 'unlinked');
        reject();
      });
    });
  });
};


const saveToDirectory = async (videos) => {

  let status = {
    success: 0,
    error: 0,
    total: 0
  };

  let lowestQuality = findLowestQualityVideoUrl(videos);
  status.total += lowestQuality.length;

  for (let file of lowestQuality) {
    await downloadVideo(file)
      .then(() => {
        status.success++;
        console.log(`Success ${status.success}/${status.total}  Errors ${status.error}:  Processed ${file.title}`);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        status.error++;
        console.log('Error Downloading Video');
      });
  }
};

module.exports.searchVideos = async () => {

  fs.rmdirSync('./videos', { recursive: true });

  fs.mkdirSync('./videos');

  await client.videos.search({ query: 'programming', 'per_page': 5 })
    .then(async response => {

      return await saveToDirectory(response.videos);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      console.log('Process Complete with Errors');
    });
};