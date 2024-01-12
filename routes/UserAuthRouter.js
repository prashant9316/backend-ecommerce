const express = require('express');
const { loginRequest, verifyOTPRequest } = require('../controllers/userAuth');
const router = express.Router();

// Define your routes here
router.post('/sendOtp', loginRequest);

router.post('/verifyOtp', verifyOTPRequest);

// Export the router
module.exports = router;
