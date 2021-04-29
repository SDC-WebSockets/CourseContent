const awsId = config.accessKeyID;
const awsSecret = config.secretAccessKey;

const BUCKET_NAME = 'charlotte-badger-course-content-stock-footage';
// const BUCKET_NAME = 'test-bucket-lksjdfhgsldkfjgsdlfkjgndsflkgjnsd';

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



const uploadOneFile = (filePath) => {
  // Read content from the file
  const fileContent = fs.readFileSync(filePath);
  const folders = filePath.split('/');
  const fileName = folders[folders.length - 1];

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'video/mp4'
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    console.log(data);
  });
};

const uploadDirectory = (directory) => {
  console.log('files not read');
  console.log(directory);
  let files = fs.readdirSync(directory);
  console.log('files read');
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(directory, files[i]);
    uploadOneFile(filePath);
  }

};

const listContents = async () => {

  const { Contents } = await s3.listObjects({ Bucket: BUCKET_NAME }).promise();
  // console.log(Contents);
  return Contents;

};

const emptyBucket = async () => {

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