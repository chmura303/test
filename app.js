const express = require('express');
const mongoose = require('mongoose');

// create express app
const app = express();

// connect to mongodb
const dbURL =
  'mongodb+srv://chmura303:0uzF0g2TYsQoDkuP@apps.5tzatnt.mongodb.net/todo-app?retryWrites=true&w=majority';

mongoose
  .connect(dbURL)
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => {
  res.send('hello');
});
