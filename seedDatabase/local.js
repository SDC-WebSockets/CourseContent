let videosArray = require('./videosArray.js');
let fs = require('fs');
let path = require('path');

module.exports = () => {
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
  for (let i = 0; i < contentArr.length; i++) {
    videosArray.push(contentArr[i]);
  }

  const configString = "module.exports = {\n  dbUrl: 'mongodb://localhost/courseContent',\n  dbName: 'courseContent'\n};";

  fs.writeFileSync(path.join(__dirname, '..', 'localConfig.js'), configString);

  const root = fs.readdirSync(path.join(__dirname, '..'));
  console.log(root)

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