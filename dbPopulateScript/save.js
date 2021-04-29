
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

const checkAll = () => {
  fs.readdir('./videos', (err, files) => {
    status.total = files.length;
    for (let i = 0; i < files.length; i++) {
      check(files[i], i === files.length - 1);
    }
  });
};

let progressCounter = 0;
let errorCounter = 0;
let total = 0;

module.exports.saveToDirectory = (videos) => {
  let lowestQuality = findLowestQualityVideoUrl(videos);
  total += lowestQuality.length;


  for (let i = 0; i < lowestQuality.length; i++) {
    downloadVideo(lowestQuality[i])
      .then(() => {
        progressCounter++;
        console.log(`Success ${progressCounter}/${total}  Errors ${errorCounter}:  Processed ${lowestQuality[i].title}`);
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