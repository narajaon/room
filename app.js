const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('user arrived in /');
  res.status(200).sendFile(`${__dirname}/index.html`);
});

io.on('connection', () => {
  console.log('SOCKET: USER CONNECTED');
});

http.listen(PORT, () => {
  console.log(`server is ${PORT} up`);
});
