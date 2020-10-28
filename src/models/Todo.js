const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/database");
const sequelize = new Sequelize(config);

const Todo = sequelize.define("todo", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Todo;
