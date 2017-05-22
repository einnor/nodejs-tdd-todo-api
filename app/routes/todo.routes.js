var express = require('express');
var router = express.Router();

var Todo = require('../models/todo.model');
var TodoController = require('../controllers/todo.controller');

// Get all todos
router.get('/todos', TodoController.GetTodo);
router.post('/todos', TodoController.PostTodo);

module.exports = router;
