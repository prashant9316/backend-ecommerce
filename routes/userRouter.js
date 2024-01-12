const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../utility/jwtHelper');
const router = express.Router();
// Update user details
router.put('/update', verifyToken, userController.updateUserDetails);

// Get user details
router.get('/details', verifyToken, userController.getUserDetails);

module.exports = router;
