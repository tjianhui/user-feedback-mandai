const express = require('express');
const app = express();
const port = 3000;
const users = require('./routes/users');

app.use(express.json());
app.use('/users', users);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});