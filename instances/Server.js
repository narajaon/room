const { createServer } = require('http');
const { parse } = require('url');

const Socket = require('./Socket');

const PORT = process.env.NODE_ENV || 3000;

class Server {
  constructor(serverHandler) {
    this.instance = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      serverHandler(req, res, parsedUrl);
    });

    this.io = new Socket(this.instance).instance;
    this.lobbies = [];
  }

  setup() {
    this.io.on('connection', (socket) => {
      console.log('IO: user connected');
      socket.on('yay', () => {
        console.log('yay server');
      });
    });

    this.instance.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  }
}

module.exports = Server;
