const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/course', controller.course);

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});