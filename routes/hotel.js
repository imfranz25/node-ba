const express = require('express');
// const auth = require('../middleware/auth');
const { addHotel } = require('../controllers/hotel');

const router = express.Router();

// ROUTING CALLS for /account
router.post('/add', addHotel);

module.exports = router;
