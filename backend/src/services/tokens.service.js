// Importing modules
import { generateOTP, generateRandomToken } from "../utils/random.util.js";
import otpModel from "../models/otp.model.js";
import resetTokenModel from "../models/resetToken.model.js";
import ApiError from "../utils/ApiError.util.js";
import userModel from "../models/user.model.js";

// funciton to generate and set otps
async function getOtp(userId, sessionId) {

    // generating the otp
    let otp = generateOTP();

    // Setting the otp in the db
    const otpSet = await otpModel.create({
        userId, sessionId, otp
    });

    return otpSet;

}

// function to check the otp from db
async function checkOtp(userId, sessionId, otp) {

    // finding the otp matching userId, sessionId and otp
    const otpFound = await otpModel.findOneAndDelete({
        userId, sessionId, otp
    });

    // checking if otp exists
    if (!otpFound) throw new ApiError(400, "Invalid or expired OTP");

    return true;

}

// function to delete old otps for a session
async function deleteOtp(userId, sessionId) {

    // deleting old otps matching userId and sessionId
    await otpModel.deleteMany({ userId, sessionId });

    return true;

}

// function to create reset token
async function createResetToken(email) {

    // finding the user by email
    const user = await userModel.findOne({ email });

    // generating a random token
    const token = generateRandomToken();

    // deleting old reset tokens for the user
    await resetTokenModel.deleteMany({ userId: user._id });

    // saving the token in db
    const resetToken = await resetTokenModel.create({
        userId: user._id, 
        token
    });

    return resetToken;

}

// function to verify reset token
async function verifyResetToken(token) {

    // finding the token in db
    const tokenFound = await resetTokenModel.findOne({ token });

    // checking if token exists
    if (!tokenFound) throw new ApiError(400, "Invalid or expired token");

    return tokenFound;

}

async function deleteToken(token) {

    // deleting the token from the db 
    await resetTokenModel.findOneAndDelete({ token });

    return true;
}

export { getOtp, checkOtp, deleteOtp, createResetToken, verifyResetToken, deleteToken };