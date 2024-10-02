import { User } from "../models/User.js"
import otp from 'otp-generator'
import bcryptjs from 'bcryptjs'
import { sendVerificationMail } from "../utils/nodemailer/nodemailer.js"
import { OTP } from "../models/OTP.js"

export const signUp = async (req, res) => {
    try {
        const data = req.body
        const email = data?.email
        const password = data?.password
        console.log(data)
        const user = new User({ email, password: await bcryptjs.hash(password, 10), verified: false })
        await user.save()
        const generated_otp = otp.generate(6)
        console.log(generated_otp)
        const newOTPObject = new OTP({ email, otp: generated_otp })
        newOTPObject.save()
        sendVerificationMail(email, newOTPObject.otp)
        res.send({ message: "saved successfully" })
    } catch (err) {
        console.log(err)
        res.send({ message: "an error occured" })
    }
}


export const emailVerification = async (req, res) => {
    try {
        const data = req.body
        const otp = data.otp
        const email = data.email
        console.log(data)
        const found = await OTP.findOne({ email, otp })
        console.log(found)
        if (found) {
            await User.updateOne({ email }, { verified: true })
            res.send({ verified: true })
        } else {
            res.send({ verified: false })
        }

    } catch (err) {
        console.log(err)
    }
}