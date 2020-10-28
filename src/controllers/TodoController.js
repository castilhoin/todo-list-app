const db = require("../config/database");
const Todo = require("../models/Todo");
module.exports = {
  async index(req, res) {
    try {
      const todos = await Todo.findAll();
      return res.json(todos);
    } catch (err) {
      return res.json({ message: err.message });
    }
  },
  async create(req, res) {
    try {
      const todo = await Todo.create(req.body);
      return res.json(todo);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  async read(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);
      return res.json(todo);
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const todo = await Todo.update(req.body, {
        where: { id: req.params.id },
      });
      return res.json();
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  async delete(req, res) {
    try {
      const todo = await Todo.destroy({ where: { id: req.params.id } });
      return res.json();
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};
