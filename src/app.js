const express = require("express");
const routes = require("./routes");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(routes);

module.exports = app;
