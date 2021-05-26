const server = require('./index.js');
const app = server.app;
const PORT = server.PORT;

app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
});