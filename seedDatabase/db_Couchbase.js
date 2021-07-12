const config = require('../config.js');

const couchbase = require('couchbase');
const cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
  username: config.userCouch,
  password: config.password,
});

const bucket = cluster.bucket('sdc_coursecontent');

const collection = bucket.defaultCollection();

