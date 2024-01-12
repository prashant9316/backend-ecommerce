const User = require('../models/User');
const { generateToken } = require('../utility/jwtHelper');
const sendOTP = require('../utility/otpHelper').sendOTP;
const verifyOTP = require('../utility/otpHelper').verifyOtp;
// Import necessary modules or dependencies
// Login controller
async function loginRequest(req, res) {
    try {
        const { phoneNumber } = req.body;
        console.log(phoneNumber)
        const user = await User.findOne({ phoneNumber: phoneNumber });

        if(user) {
            const response = sendOTP(phoneNumber);
            if(response){
                res.status(200).json({ message: 'User Exists! OTP sent successfully' });
            } else {
                res.status(400).json({ message: 'User Exists! OTP not sent' });
            }
        } else {
            const user = new User({ phoneNumber });
            await user.save();
            const response = sendOTP(phoneNumber);
            if(response){

                res.status(200).json({ message: 'User created! OTP sent successfully' });
            } else {
                res.status(400).json({ message: 'User created! OTP not sent' });
            }
        }
    } catch (error) {
        // Handle error
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Generate OTP controller
function generateOTP(req, res) {
    try {
        // TODO: Implement OTP generation logic
        // Example logic: Generate a random OTP and send it to the user's phone number
        const otp = Math.floor(1000 + Math.random() * 9000);

        // Send OTP to user's phone number (e.g., via SMS or email)
        // ...

        res.status(200).json({ otp });
    } catch (error) {
        // Handle error
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Verify OTP controller
async function verifyOTPRequest(req, res) {
    try {
        const { otp, phoneNumber } = req.body;

        // TODO: Implement OTP verification logic
        // Example logic: Verify if the provided OTP matches the one sent to the user
        const isOTPValid = await verifyOTP(phoneNumber, otp) // Replace '1234' with the actual OTP sent to the user

        if (isOTPValid) {
            // OTP is valid, perform further actions
            const token = generateToken({ phoneNumber });
            res.status(200).json({ message: 'OTP verified successfully', token });
        } else {
            // OTP is invalid, handle error or redirect to OTP verification page
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        // Handle error
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    loginRequest,
    generateOTP,
    verifyOTPRequest,
};
