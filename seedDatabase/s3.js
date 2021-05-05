const path = require('path');
const AWS = require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');
const config = require('../config.js');
const fs = require('fs');

const awsId = config.accessKeyID;
const awsSecret = config.secretAccessKey;
const BUCKET_NAME = 'charlotte-badger-course-content-stock-footage';

const s3 = new AWS.S3({
  accessKeyId: awsId,
  secretAccessKey: awsSecret
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: 'eu-west-2'
  }
};

const emptyBucket = async () => {
  console.log(`Emptying Bucket ${BUCKET_NAME}`);

  const { Contents } = await s3.listObjects({ Bucket: BUCKET_NAME }).promise();
  if (Contents.length > 0) {
    await s3.deleteObjects({
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: Contents.map(({ Key }) => ({ Key }))
      }
    })
      .promise();
  }

  return true;
};

const uploadOneFile = async (file) => {
  // Read content from the file
  console.log('Uploading:', file);
  const fileContent = fs.readFileSync(file);
  let fileName = file.split('/');
  fileName = fileName[fileName.length - 1];

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: 'video/mp4'
  };

  return await s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    return `Uploaded: ${data.key}`;
  }).promise();
};

module.exports.videosArray = [];

module.exports.uploadDirectory = async (directory, isLocal = false) => {
  if (!isLocal) {
    await emptyBucket();
    console.log('Beginning upload to S3');
    let files = fs.readdirSync(directory);
    for (let file of files) {
      const filePath = path.join(directory, file);
      await uploadOneFile(filePath)
        .then(async (result) => {
          console.log(`Uploaded ${result.key}`);
          ffmpeg.ffprobe(filePath, function (err, metadata) {
            let duration = Math.floor(metadata.format.duration * 1000);
            let obj = {
              url: result.Location,
              duration: duration
            };
            module.exports.videosArray.push(obj);
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
          console.log('Upload failed');
        });
    }
    return 'Upload to S3 Complete!';
  } else {
    let contentArr = [
      {
        url: 'https://charlotte-badger-course-content-stock-footage.s3.eu-west-2.amazonaws.com/a-computer-monitor-flashing-digital-information-2887463.mp4',
        duration: 10000
      },
      {
        url: 'https://charlotte-badger-course-content-stock-footage.s3.eu-west-2.amazonaws.com/a-human-hand-busy-working-on-a-computer-laptop-2516159.mp4',
        duration: 7000
      },
      {
        url: 'https://charlotte-badger-course-content-stock-footage.s3.eu-west-2.amazonaws.com/a-man-busy-working-on-his-laptop-5495790.mp4',
        duration: 17000
      }

    ];
    module.exports.videosArray = contentArr;
    console.log(module.exports.videosArray);
    return 'Dry run complete';
  }
};