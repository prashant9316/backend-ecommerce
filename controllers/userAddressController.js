// Import the necessary modules and models
const UserAddress = require('../models/userAddress');
const { isServiceable } = require('../utility/addressService');

// Controller methods for CRUD operations
const userAddressController = {
    // Create a new user address
    create: async (req, res) => {
        try {
            const { house, street, landmark, city, pincode, longitude, latitude } = req.body;
            const serviceCheck = isServiceable({ location: { type: 'Point', coordinates: [longitude, latitude] } });

            const newUserAddress = new UserAddress({ address: {house, street, landmark, area, city, pincode}, user: req.user._id , location: { type: 'Point', coordinates: [longitude, latitude] }, isServiceable: serviceCheck });
            const savedUserAddress = await newUserAddress.save();
            res.status(201).json(savedUserAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user address' });
        }
    },

    // Read all user addresses
    readAll: async (req, res) => {
        try {
            const userAddresses = await UserAddress.find({ user: req.user._id});
            res.json(userAddresses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user addresses' });
        }
    },

    // Read a specific user address by ID
    readById: async (req, res) => {
        try {
            const userAddress = await UserAddress.findById(req.params.id);
            if (!userAddress) {
                return res.status(404).json({ error: 'User address not found' });
            }
            res.json(userAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user address' });
        }
    },

    // Update a user address by ID
    updateById: async (req, res) => {
        try {
            const { address, city, state, country } = req.body;
            const updatedUserAddress = await UserAddress.findByIdAndUpdate(
                req.params.id,
                { address, city, state, country },
                { new: true }
            );
            if (!updatedUserAddress) {
                return res.status(404).json({ error: 'User address not found' });
            }
            res.json(updatedUserAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user address' });
        }
    },

    // Delete a user address by ID
    deleteById: async (req, res) => {
        try {
            const deletedUserAddress = await UserAddress.findByIdAndDelete(req.params.id);
            if (!deletedUserAddress) {
                return res.status(404).json({ error: 'User address not found' });
            }
            res.json(deletedUserAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete user address' });
        }
    }
};

module.exports = userAddressController;
