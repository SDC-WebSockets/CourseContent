const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller.js');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/course', controller.course);

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});