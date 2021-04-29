// Generate Database Model
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const {checkIntegrity} = require('untegrity');
const AWS = require('aws-sdk');