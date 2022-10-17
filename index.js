const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

require('./config/database').connect()
  .then(() => {
    // server listening
    server.listen(port, () => {
      console.log(`Connected to Database + Server running on port ${port}`);
    });
  }).catch((err) => console.log(err));
