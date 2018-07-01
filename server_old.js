// server.js

const express = require('express');
const app = express();
const mongodb = require('mongodb');

const config = require('./db');
const PORT = 4000;
const client = mongodb.MongoClient;
const User = require('./src/models/User');

client.connect(config.DB, function(err, conn) {
  if(err) {
    console.log('database is not connected');
  } else {
    console.log('connected!!');
  }
});

User.create({
  "name": "tom",
  "email": "tom@example.com",
  "bio": "blurb",
  "image": "https://i.imgur.com/WOmw9Ws.jpg"
});

app.get('/', function(req, res) {
  User.count({}, function(err, count) {
    if (err) console.log(err);
    console.log(count);
  });
  res.json({"test": "test"});
});

let server = app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:', PORT);
});

process.on('SIGTERM', function () {
   server.close(function () {
     console.log("Finished all requests");
   });
});
