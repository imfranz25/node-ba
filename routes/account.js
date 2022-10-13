const express = require("express");
const { createAccount } = require("../controllers/account.js");

const router = express.Router();

// ROUTING CALLS
router.post('/create', createAccount);

module.exports = router;