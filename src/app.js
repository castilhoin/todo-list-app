const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const methodOverride = require('method-override');
const TodoController = require('./controllers/TodoController');
const app = express();
app.set('views', './views');
app.set('view engine', 'ejs')
app.use(express.static('../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

app.get('/', TodoController.index);
app.post('/', TodoController.create);
app.get('/:id/edit', TodoController.edit);
app.put('/:id', TodoController.update);
app.delete('/:id', TodoController.delete);

module.exports = app;