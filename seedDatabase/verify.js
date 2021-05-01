const path = require('path');
const fs = require('fs');
const { checkIntegrity } = require('untegrity');

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

module.exports.checkAll = async () => {
  console.log('Checking file integrity');
  let files = fs.readdirSync('./videos');

  status.total = files.length;
  for (let file of files) {
    await check(file);
  }
};