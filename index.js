const express = require('express');

const todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(2222, () => {
  console.log('You are listening to port 2222');
});
