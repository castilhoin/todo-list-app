const app = require('./app');
const port = 3001;
app.listen(port, err => {
  console.log(`Server is listening on port ${port}.`);
});