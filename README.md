# Project Name
Course Content for Udemy Clone (Front End Capstone project by Hack Reactor RPT27 team Charlotte Badger https://github.com/Charlotte-Badger)

## Related Projects
- Reviews
https://github.com/Charlotte-Badger/Reviews
- Overview
https://github.com/Charlotte-Badger/Overview
- Sidebar
https://github.com/Charlotte-Badger/Sidebar

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)


## Requirements
- Node 14.15.0

## Development

### Installing dependencies
From within the Course-Content directory:
```sh
npm install
```
### Creating the bundle file
From within the Course-Content directory:
```sh
npm run react-dev
```

If pushing bundle file to S3 using the WebpackS3Plugin, you must store your credentials in a config.js file at the root directory.

### Populating the database
From within the Course-Content directory:
```sh
npm run seed
```

A basic configuration file named 'localConfig.js' will be written to your root directory. Make sure that the generated credentials match what will require.

If utilizing or accessing any remote services (i.e. MongoDB Atlas, AWS, Pexels, etc...) you will need to provide a config.js file in the top level directory with the following format:

```javascript
module.exports = {
  dbUrl: // Database Url,
  dbName: // Database Name,
  accessKeyID: // S3 Access Key,
  secretAccessKey: // S3 Secret Access Key,
  pexelKey: // Key for pexel API. If you want to use mine it's pinned on the Charlotte-Badger Slack Channel
};
```

 You will also need to change line 39 of 'seedDatabase/index.js' to
 ```javascript
 runScript(false);
 ```

### Starting the server in development mode
From within the Course-Content directory:
```sh
npm server-dev
```

## Starting the server in production mode
From within the Course-Content directory:
```sh
npm start
```