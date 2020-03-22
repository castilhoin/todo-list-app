const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const db = require(path.join(__dirname, '..', 'config', 'database'));
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// index - show tasks
app.get('/', async (req, res, next) => {
  const query = await db.query("SELECT * FROM tasks");
  const tasks = query.rows;
  res.render('index', { tasks });
});

// create task
app.post('/', async (req, res, next) => {
  const name = req.body.newTask;
  await db.query("INSERT INTO tasks (name, completed) VALUES ($1, $2)", [name, false]);
  res.redirect('/');
});

// edit task
app.get('/:id/edit', async (req, res, next) => {
  const id = req.params.id;
  const query = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
  const row = query.rows[0];
  res.render('edit', { task: row });
});

// update task
app.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.taskName;
  const completed = (req.body.completed === 'completed') ? true : false;
  await db.query("UPDATE tasks SET name = $2, completed = $3 WHERE id = $1", [id, name, completed]);
  res.redirect('/');
});

module.exports = app;