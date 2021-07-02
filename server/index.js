const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const controller = require('./controller.js');
const expressStaticGzip = require('express-static-gzip');
const cors = require('cors');
const PORT = process.env.PORT || 9800;
const Promise = require('bluebird');
const generate = require('../seedDatabase/generate.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(compression({
  level: 9
}));

app.use(cors());

app.get('/bundle', controller.bundle);

app.get('/course/item', controller.course);

app.get('/section/item', controller.section);

app.get('/element/item', controller.element);

// *********************SDC BLOCK********************
// Support CRUD from your API

// CREATE
// !!! THE CURRENT GENERATION SCRIPT NEEDS TO BE REWRITTEN SO THAT PASSED COURSEID WILL BE ASSIGNED
app.post('/create/course/item', (req, res) => {
  Promise.resolve(req.query.courseId)
    .tap(id => {
      if (!id) {
        throw id;
      }
      return db.Course.create(generate.generateAllCourses(1));
    })
    .then(id => {
      res.send(`Course with courseId ${id} has been added successfully.`);
    })
    .catch(err => {
      res.send(err);
    });
});


// READ
app.get('/read/course/item', (req, res) => {
  Promise.resolve(req.query.courseId)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.Course.find({courseId: parseInt(id)});
    })
    .then(records => {
      res.json(records[0]);
    })
    .catch(err => {
      res.send(err);
    });
});


// UPDATE
app.put('/update/course/item', jsonParser, (req, res) => {
  Promise.resolve(req.body)
    .tap(data => {
      if (!data) {
        throw data;
      }
      const id = data.courseId;
      const filter = { courseId: id };
      const update = data.update;
      return db.Course.findOneAndUpdate(filter, update, {
        new: true,
        useFindAndModify: false
      });
    })
    .then(data => {
      res.send(`Course with courseId ${data.courseId} has been successfully updated.`);
    })
    .catch(err => {
      res.send(err);
    });
});

// DELETE
app.delete('/delete/course/item', (req, res) => {
  Promise.resolve(req.query.courseId)
    .tap(id => {
      if (!id) {
        throw id;
      }
      return db.Course.findOneAndDelete({courseId: parseInt(id)});
    })
    .then(id => {
      res.send(`Course with courseId ${id} has been successfully deleted.`);
    })
    .catch(err => {
      res.send(err);
    });
});

// *********************SDC BLOCK********************

app.use('/', expressStaticGzip(path.join(__dirname, '..', 'client', 'dist')));

module.exports.app = app;

module.exports.PORT = PORT;