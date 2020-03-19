const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const tasks = require('./tasks');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.render('index', { tasks });
});
app.post('/add', (req, res, next) => {
  const newTask = req.body.newTask;
  tasks.push({ "name": newTask, "completed": false });
  res.redirect('/');
})
module.exports = app;