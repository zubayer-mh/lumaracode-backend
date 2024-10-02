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
        const exists = await User.findOne({ email })

        if (exists) {
            return res.send({ message: "User already exists!" })
        }

        const user = new User({ email, password: await bcryptjs.hash(password, 10), verified: false, provider: "credentials" })
        await user.save()

        const generated_otp = otp.generate(6)
        const newOTPObject = new OTP({ email, otp: generated_otp })
        newOTPObject.save()

        sendVerificationMail(email, newOTPObject.otp)

        return res.send({ user })
    } catch (err) {
        console.log(err)
        return res.send({ message: "an error occured" })
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


export const login = async (req, res) => {
    try {
        const data = req.body
        const email = data?.email
        const password = data?.password
        const user = await User.findOne({ email })
        // console.log(user)
        if (user) {
            const matched = await bcryptjs.compare(password, user.password)
            console.log(matched)
            if (matched) {
                res.send({ user })
            } else {
                res.send({ message: "Password is Incorrect!" })
            }

        } else {
            res.send({ message: "No User Found!" })
        }
    } catch (err) {
        console.log(err)
        res.send({ message: "an error occured" })
    }
}


export const OAuthLogin = async (req, res) => {
    try {
        const data = req.body
        const email = data?.email
        const provider = data.provider

        const user = await User.findOne({ email })
        if (!user) {
            const user = new User({ email, verified: true, provider })
            await user.save()
            return res.send({ message: "User Logged In Succesfully!" })
        } else {
            if (user.provider !== provider) {
                return res.status(401).send({ message: "User Already Registerd!" })
            }
            return res.send({ message: "User Logged In Succesfully!" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "an error occured" })
    }
}