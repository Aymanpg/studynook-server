const Room = require('../models/Room');

// GET ALL ROOMS (with search and filter)
const getAllRooms = async (req, res) => {
  try {
    const { search, amenities } = req.query;

    let filter = {};

    // Search by name
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Filter by amenities
    if (amenities) {
      const amenityList = amenities.split(',');
      filter.amenities = { $in: amenityList };
    }

    const rooms = await Room.find(filter).populate('owner', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// GET LATEST 6 ROOMS (for home page)
const getLatestRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('owner', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// GET SINGLE ROOM
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('owner', 'name email');
    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// ADD ROOM
const addRoom = async (req, res) => {
  try {
    const { name, description, image, floor, capacity, hourlyRate, amenities } = req.body;

    const room = await Room.create({
      name,
      description,
      image,
      floor,
      capacity,
      hourlyRate,
      amenities,
      owner: req.user.id
    });

    res.status(201).json({ message: 'Room added successfully!', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// UPDATE ROOM (owner only)
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    // Check ownership
    if (room.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this room.' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: 'Room updated successfully!', room: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// DELETE ROOM (owner only)
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    // Check ownership
    if (room.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this room.' });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Room deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// GET MY ROOMS (owner's listings)
const getMyRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ owner: req.user.id });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  getAllRooms,
  getLatestRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
  getMyRooms
};