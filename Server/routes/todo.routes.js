const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const {
  createTodo,
  getMyTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo.controller');

const router = express.Router();

router.use(protect); // All todo routes require authentication

router.route('/')
  .post(createTodo)
  .get(getMyTodos);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;