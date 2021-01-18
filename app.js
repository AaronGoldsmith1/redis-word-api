const express = require("express");
const app = express();

const redis = require('redis');

const client = redis.createClient({
    host: 'redis-17409.c8.us-east-1-4.ec2.cloud.redislabs.com',
    port: 17409,
    password: '7wxADJhObnAqeuI3Z3XlSKN9NCHs3aaM'
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



