require('dotenv').config({path: '../.env'});

const couchbase = require('couchbase');
const cluster = new couchbase.Cluster('couchbase://127.0.0.1', {
  username: process.env.COUCH_USER,
  password: process.env.COUCH_PASS,
});

const bucket = cluster.bucket(process.env.COUCH_DB_NAME);
const collection = bucket.defaultCollection();