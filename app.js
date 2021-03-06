const next = require('next');
const Server = require('./instances/Server');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = new Server();

    server.setup(handle);
  })
  .catch(err => {
    console.log(err);
  });
