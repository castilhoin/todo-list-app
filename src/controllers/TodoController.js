const db = require('../../config/database');

module.exports = {
  async index(req, res, next) {
    try {
      const query = await db.query("SELECT * FROM tasks");
      const tasks = query.rows;
      res.render('index', { tasks });
    } catch(err) {
      console.log('Error: ', err);
      res.render('error', { err });
    };
  },
  async create(req, res, next) {
    try {
      const name = req.sanitize(req.body.newTask);
      await db.query("INSERT INTO tasks (name, completed) VALUES ($1, $2)", [name, false]);
      res.redirect('/');
    } catch(err) {
      console.log('Error: ', err);
      res.render('error', { err });
    };
  },
  async edit(req, res, next) {
    try {
      const id = req.params.id;
      const query = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
      const row = query.rows[0];
      res.render('edit', { task: row });
    } catch(err) {
      console.log('Error: ', err);
      res.render('error', { err });
    };
  },
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const name = req.sanitize(req.body.taskName);
      const completed = (req.body.completed === 'completed') ? true : false;
      await db.query("UPDATE tasks SET name = $2, completed = $3 WHERE id = $1", [id, name, completed]);
      res.redirect('/');
    } catch(err) {
      console.log('Error: ', err);
      res.render('error', { err });
    };
  },
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await db.query("DELETE FROM tasks WHERE id = $1", [id]);
      res.redirect('/');
    } catch(err) {
      console.log('Error: ', err);
      res.render('error', { err });
    }
  }
};