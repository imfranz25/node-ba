const express = require('express');
const { createAccount, validateUser } = require('../controllers/account');

const router = express.Router();

// ROUTING CALLS for /account
router.post('/create', createAccount);
router.post('/login', validateUser);

module.exports = router;
