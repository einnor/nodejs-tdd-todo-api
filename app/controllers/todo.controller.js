var Todo = require('../models/todo.model');

var TodoCtrl = {
    // Get all todos from the Database
    GetTodo: function(req, res){
        Todo.find({}, function(err, todos){
          if(err) {
            res.json({status: false, error: "Something went wrong"});
            return;
          }
          res.json({status: true, todo: todos});
        });
    }
}

module.exports = TodoCtrl;
