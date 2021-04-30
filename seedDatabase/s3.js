const path = require('path');
const AWS = require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');
const config = require('./config.js');
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

// s3.createBucket(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log('Bucket Created Successfully', data.Location);
// });

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

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'video/mp4'
  };

  // Uploading files to the bucket
  return await s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    return `Uploaded: ${data.key}`;
  }).promise();
};

module.exports.videosArray = [];

module.exports.uploadDirectory = async (directory, dryRun = false) => {
  if (!dryRun) {
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
    return 'Dry run complete';
  }
};

// const listContents = async () => {
//   let fileUrls = [];

//   const { Contents } = await s3.listObjects({ Bucket: BUCKET_NAME }).promise();
//   // console.log(Contents);
//   for (let i = 0; i < Contents.length; i++) {
//     let url = `https://${BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${Contents[i].Key}`;
//     fileUrls.push(url);
//   }

//   return fileUrls;
// };