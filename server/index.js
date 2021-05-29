const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9800;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/bundle', controller.bundle);

app.get('/course/item', controller.course);

app.get('/section/item', controller.section);

app.get('/element/item', controller.element);

module.exports.app = app;

module.exports.PORT = PORT;