const express = require('express');
const router = express.Router();
const UserAddressController = require('../controllers/userAddressController.js');

// Define routes
router.get('/', UserAddressController.readAll);
router.get('/:id', UserAddressController.readById);
router.post('/', UserAddressController.create);
router.put('/:id', UserAddressController.updateById);
router.delete('/:id', UserAddressController.deleteById);

module.exports = router;
