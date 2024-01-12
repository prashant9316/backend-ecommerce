const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// JWT Required

const getUserDetails = async(req, res) => {
    try {
        const user = await User.findOne({ phoneNumber: req.user.phoneNumber });
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUserDetails = async(req, res) => {
    try {
        const { name, email } = req.body;
    
        const updatedUser = await User.findOne({ phoneNumber: req.user.phoneNumber });
        updatedUser.name = name;
        updatedUser.email = email;
        await updatedUser.save();
    
        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    updateUserDetails,
    getUserDetails
};
