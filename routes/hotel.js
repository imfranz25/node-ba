const express = require('express');
const auth = require('../middleware/auth');
const {
  addHotel,
  addHotelForm,
  deleteHotel,
  viewHotel,
} = require('../controllers/hotel');

const router = express.Router();

// ROUTING CALLS for /account
router.get('/add', auth, addHotelForm);
router.get('/view/:id', auth, viewHotel);
router.post('/add', auth, addHotel);
router.post('/delete', auth, deleteHotel);

module.exports = router;
