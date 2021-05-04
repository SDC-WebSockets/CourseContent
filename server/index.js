const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/content/item', express.static(path.join(__dirname, '..', 'client', 'dist')));
// app.get('/content/item');

app.get('/course/item', controller.course);

app.get('/section/item', controller.section);

app.get('/element/item', controller.element);

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});