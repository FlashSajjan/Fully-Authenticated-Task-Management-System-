const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const { getAllTodos } = require('../controllers/todo.controller');
const { getAllUsers, updateUserRole } = require('../controllers/admin.controller');

const router = express.Router();

router.use(protect);
router.use(adminOnly); // All admin routes require admin role

router.get('/todos', getAllTodos);
router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);


module.exports = router;