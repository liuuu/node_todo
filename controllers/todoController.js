const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const urlencodeParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb://test:test@ds046267.mlab.com:46267/basic_node_todo');

const todoSchema = new mongoose.Schema({
  item: String,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {
  app.get('/todo', (req, res) => {
    Todo.find({}, (error, data) => {
      if (error) {
        throw error;
      }
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodeParser, (req, res) => {
    console.log('req.body', req.body);
    const newTodo = req.body;
    Todo(newTodo).save((error, data) => {
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    Todo.find({
      item: req.params.item.replace(/\-/g, ' '),
    }).remove((error, data) => {
      if (error) throw error;
      res.json(data);
    });
  });
};
