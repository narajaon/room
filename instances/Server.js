/* eslint-disable no-param-reassign */
const express = require('express');
const secret = require('../secret.json');
const config = require('../config.json');

const PORT = process.env.NODE_ENV || 3000;

class Server {
  constructor() {
    this.instance = express();
  }

  setup(serverHandler) {
    this.instance.use(/\//, (req, res, next) => {
      req.api_url = config.api_url;
      req.api_url_old = config.api_url_old;
      req.client_id = secret.client_id;
      req.client_secret = secret.client_secret;

      next();
    });

    this.instance.get('*', (req, res) => {
      serverHandler(req, res);
    });

    this.instance.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  }
}

module.exports = Server;
