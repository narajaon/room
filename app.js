const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('user arrived in /');
  res.send('<b>A BOILERPLATE</b>');
});

app.listen(PORT, () => {
  console.log(`server is ${PORT} up`);
});
