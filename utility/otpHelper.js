const axios = require('axios');
const User = require('../models/User');
const OTP = require('../models/otp');

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

async function sendOTP(phoneNumber) {
    const data = {
        phoneNumber: phoneNumber,
        otp: generateOTP()
    };

    const user = await User.findOne({phoneNumber: phoneNumber});

    const newOtp = new OTP({
        otp: data.otp,
        userRef: user._id
    });
    await newOtp.save();
    // return axios.post('https://api.example.com/send-otp', data)
    //     .then(response => {
    //        console.log("OTP sent successfully");
    //        return true;
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         console.log("OTP not sent");
    //         return false;
    //     });
    console.log("OtP sent successfully");
}

async function verifyOtp(phoneNumber, otp) {
    const user = await User.findOne({phoneNumber: phoneNumber});
    console.log(user)
    const otpRecord = await OTP.findOne({otp: otp, userRef: user._id});
    if(otpRecord){
        await OTP.findOneAndDelete({otp: otp, userRef: user._id});
        console.log("OTP verified successfully");
        return true;
    }
    console.log("OTP not found")
    return false;
}

module.exports = {
    generateOTP,
    sendOTP,
    verifyOtp
};