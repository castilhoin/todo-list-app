require('dotenv').config;
const { Client } = require('pg');
const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});
db.connect(err => {
  if (err) console.error("Database error: ", err.stack);
});
module.exports = db;