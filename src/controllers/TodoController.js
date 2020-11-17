const db = require("../config/database");
const Todo = require("../models/Todo");
module.exports = {
  async index(req, res) {
    try {
      const todos = await Todo.findAll();
      return res.render("index", { tasks: todos });
    } catch (err) {
      return res.render("error", { err: err.message });
    }
  },
  async create(req, res) {
    try {
      const todo = await Todo.create({
        name: req.body.newTask,
        isCompleted: false
      });
      return res.redirect("/");
    } catch (err) {
      res.render("error", { err: err.message });
    }
  },
  async edit(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);
      return res.render("edit", { task: todo });
    } catch (err) {
      res.render("error", { err: err.message });
    }
  },
  async update(req, res) {
    try {
      const isCompleted = req.body.isCompleted == "isCompleted" ? true : false;
      const todo = await Todo.update({
        name: req.body.taskName,
        isCompleted: isCompleted
      }, {
        where: { id: req.params.id },
      });
      return res.redirect("/");
    } catch (err) {
      res.render("error", { err: err.message });
    }
  },
  async delete(req, res) {
    try {
      const todo = await Todo.destroy({ where: { id: req.params.id } });
      return res.redirect("/");
    } catch (err) {
      res.render("error", { err: err.message });
    }
  },
};
