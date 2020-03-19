const express = require('express');
const app = express();
const path = require('path');
const todos = require('./todos');
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.render('index', { todos });
});
module.exports = app;