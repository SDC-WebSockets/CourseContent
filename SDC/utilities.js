const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const csvWriter = require('csv-write-stream');
const fs = require('graceful-fs');

// HELPER FUNCTIONS
const numOfSubs = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomKindWithProb = function() {
  const kinds = ['lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'lecture', 'exercise', 'exercise', 'quiz', 'article', 'article', 'article', 'quiz', 'lecture', 'lecture', 'exercise'];
  return kinds[Math.floor(Math.random() * kinds.length)];
};

const writeRecord = async(obj, filePath) => {
  const writer = csvWriter( {sendHeaders: false} );
  writer.pipe(fs.createWriteStream(filePath, {flags: 'a'}));
  writer.write(obj);
  writer.end();
};

const randomDate = function(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

module.exports.numOfSubs = numOfSubs;
module.exports.randomKindWithProb = randomKindWithProb;
module.exports.writeRecord = writeRecord;
module.exports.randomDate = randomDate;
module.exports.lorem = lorem;