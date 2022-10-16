const express = require('express');
const auth = require('../middleware/auth');
const { addHotel, addHotelForm } = require('../controllers/hotel');

const router = express.Router();

// ROUTING CALLS for /account
router.get('/add', auth, addHotelForm);
router.post('/add', auth, addHotel);

module.exports = router;
