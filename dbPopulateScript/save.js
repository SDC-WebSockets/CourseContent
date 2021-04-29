const fs = require('fs');

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

let status = {
  success: 0,
  error: 0,
  total: 0
};

const check = async (name, last) => {
  const filePath = path.join(__dirname, 'videos', name);
  console.log('Checking file:', filePath);
  const valid = await checkIntegrity(filePath);
  if (valid) {
    status.success++;
    console.log('Video Valid!');
    console.log(`${status.success}/${status.total}`);
  } else {
    fs.unlink(filePath, () => {
      status.error++;
      console.log('unlinked');
      console.log(`${status.error}/${status.total}`);
    });
  }
  if (last) {
    console.log('Integrity Check Complete');
    console.log(`${status.error + status.success} files processed of ${status.total} files`);
    console.log(`${status.success} passed`);
    console.log(`${status.error} deleted`);
  }
};

module.exports.checkAll = () => {
  fs.readdir('./videos', (err, files) => {
    status.total = files.length;
    for (let i = 0; i < files.length; i++) {
      check(files[i], i === files.length - 1);
    }
  });
};

const randomFileName = () => {
  let alpha = 'qwertyuiopasdfghjklzxcvbnm';
  let string = '';

  for (let i = 0; i < 8; i++) {
    string += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return string;
};

module.exports.findLowestQualityVideoUrl = (videos) => {
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

let progressCounter = 0;
let errorCounter = 0;
let total = 0;

module.exports.saveToDirectory = (videos) => {
  console.log(videos);
  total += videos.length;


  for (let i = 0; i < videos.length; i++) {
    downloadVideo(videos[i])
      .then(() => {
        progressCounter++;
        console.log(`Success ${progressCounter}/${total}  Errors ${errorCounter}:  Processed ${videos[i].title}`);
      })
      .catch((err) => {
        if (err) {
          // console.log(err);
        }
        errorCounter++;
        console.log('Error Downloading Video');

      });
  }

};