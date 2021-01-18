const express = require("express");
const app = express();
const dotenv = require('dotenv').config();

const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

client.on('error', err => {
  console.log('Error ' + err);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/:word', function (req, res) {
  client.get(req.params.word, (err, reply) => {
    if (err) {
      res.json(err);
    } 
    res.json(reply)
  });
})



