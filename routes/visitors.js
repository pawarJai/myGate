const express = require('express');
const {
  getAllVisitors,
  getVisitorById,
  addVisitor,
} = require('../controllers/visitorController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Get all visitors
router.get('/', protect, getAllVisitors);

// Get a visitor by id
router.get('/:id', protect, getVisitorById);

// Add a new visitor
router.post('/', protect, addVisitor);

module.exports = router;
