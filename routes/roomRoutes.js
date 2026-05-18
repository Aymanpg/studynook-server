const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllRooms,
  getLatestRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
  getMyRooms
} = require('../controllers/roomController');

// Public routes
router.get('/', getAllRooms);
router.get('/latest', getLatestRooms);
router.get('/my-rooms', authMiddleware, getMyRooms);
router.get('/:id', getRoomById);

// Private routes
router.post('/', authMiddleware, addRoom);
router.put('/:id', authMiddleware, updateRoom);
router.delete('/:id', authMiddleware, deleteRoom);

module.exports = router;