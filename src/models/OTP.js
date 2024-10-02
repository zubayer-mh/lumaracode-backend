import mongoose from 'mongoose'

const OTPSchema = mongoose.Schema({
    email: String,
    otp: String
})

export const OTP = mongoose.model("otp", OTPSchema)