const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

// create express app
const app = express();

// set view engine
app.set('view engine', 'ejs');

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// static elements
app.use(express.static('public'));

// connect to mongodb
const dbURL =
  'mongodb+srv://chmura303:0uzF0g2TYsQoDkuP@apps.5tzatnt.mongodb.net/todo-app?retryWrites=true&w=majority';

mongoose
  .connect(dbURL)
  .then(result => app.listen(5000))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => {
  res.redirect('/todos');
});

// todo routes
app.get('/todos', (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then(result => res.render('index', { title: 'Home', todos: result }))
    .catch(err => console.log(err));
});

app.post('/todos', (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then(result => res.redirect('/todos'))
    .catch(err => console.log(err));
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then(result => res.json({ redirect: '/todos' }))
    .catch(err => console.log(err));
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});
