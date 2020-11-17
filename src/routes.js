const { Router } = require("express");
const TodoController = require("./controllers/TodoController");
const routes = Router();

routes.get("/", TodoController.index);
routes.post("/", TodoController.create);
routes.get("/:id", TodoController.edit);
routes.put("/:id", TodoController.update);
routes.delete("/:id", TodoController.delete);

module.exports = routes;
