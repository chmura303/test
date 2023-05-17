const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

// create express app
const app = express();

// set view engine
app.set('view engine', 'ejs');

// connect to mongodb
const dbURL =
  'mongodb+srv://chmura303:0uzF0g2TYsQoDkuP@apps.5tzatnt.mongodb.net/todo-app?retryWrites=true&w=majority';

mongoose
  .connect(dbURL)
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});
