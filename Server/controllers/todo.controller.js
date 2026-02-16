const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
  const { title, description, dueDate, category } = req.body;

  try {
    const todo = await Todo.create({
      title,
      description,
      dueDate,
      category,
      user: req.user.id,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllTodos = async (req, res) => { // admin only
  try {
    const todos = await Todo.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // User can only view own todo unless admin
    if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // User can only update own todo unless admin
    if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await todo.deleteOne();
    res.json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTodo,
  getMyTodos,
  getTodoById,
  getAllTodos,
  updateTodo,
  deleteTodo,
};