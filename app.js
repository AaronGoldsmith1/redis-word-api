const express = require('express');
const app = express();
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000; 

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on('error', err => {
  console.log(`Error: ${err}`);
});

app.get('/:word', (req, res) => {
  client.get(req.params.word, (err, reply) => {
    if (err) {
      return res.status(500).json({ error })
    };
    return res.status(200).json({ data: reply })
  });
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


