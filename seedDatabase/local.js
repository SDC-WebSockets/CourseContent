let videosArray = require('./videosArray.js');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  let contentArr = [
    {
      url: 'https://sdc-coursecontent.s3.amazonaws.com/a-computer-monitor-flashing-digital-information-2887463.mp4',
      duration: 10000
    },
    {
      url: 'https://sdc-coursecontent.s3.amazonaws.com/computer-monitor-display-2278095.mp4',
      duration: 55000
    },
    {
      url: 'https://sdc-coursecontent.s3.amazonaws.com/matrix-console-hacking-code-852292.mp4',
      duration: 16000
    },
    {
      url: 'https://sdc-coursecontent.s3.amazonaws.com/person-typing-fast-852421.mp4',
      duration: 8000
    },
    {
      url: 'https://sdc-coursecontent.s3.amazonaws.com/typing-of-codes-854053.mp4',
      duration: 15000
    }
  ];
  for (let i = 0; i < contentArr.length; i++) {
    videosArray.push(contentArr[i]);
  }

  const configString = "module.exports = {\n  dbUrl: 'mongodb://localhost/courseContent',\n  dbName: 'courseContent'\n};";

  fs.writeFileSync(path.join(__dirname, '..', 'localConfig.js'), configString);

  const root = fs.readdirSync(path.join(__dirname, '..'));

  if (root.includes('.gitignore')) {
    let gitignore = fs.readFileSync(path.join(__dirname, '..', '.gitignore'));
    if (!gitignore.toString().includes('localConfig.js')) {
      fs.unlinkSync(path.join(__dirname, '..', '.gitignore'));
      fs.writeFileSync(path.join(__dirname, '..', '.gitignore'), gitignore + '\nlocalConfig.js');
    }
  } else {
    fs.writeFileSync(path.join(__dirname, '..', '.gitignore'), 'localConfig.js');
  }

  return 'Remote urls defined';
};