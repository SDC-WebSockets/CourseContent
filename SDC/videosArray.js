const fs = require('fs');
const file = `${__dirname}/videos/uploaded.txt`;
module.exports = fs.readFileSync(file, 'utf-8').split(/\r?\n/);