const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require(path.join(__dirname, '..', 'config', 'database'));
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// index page
app.get('/', async (req, res, next) => {
  const query = await db.query("SELECT * FROM tasks");
  const tasks = query.rows;
  return res.render('index', { tasks });
});

// add task
app.post('/', async (req, res, next) => {
  const name = req.body.newTask;
  await db.query("INSERT INTO tasks (name, completed) VALUES ($1, $2)", [name, false]);
  return res.redirect('/');
});
module.exports = app;