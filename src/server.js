require('dotenv').config();
const app = require('./app');
const port = process.env.PORT;
app.listen(port, err => {
  console.log(`Server is listening on port ${port}.`);
});