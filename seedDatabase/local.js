let videosArray = require('./videosArray.js');

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
  // videosArray = contentArr;
  console.log(videosArray);
  return 'Remote urls defined';
};