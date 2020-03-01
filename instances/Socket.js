const io = require('socket.io');

class Socket {
  constructor(server) {
    this.instance = io(server);
  }
}

module.exports = Socket;
