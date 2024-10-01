import { User } from "../models/User.js"

export const signUp = async (req, res) => {
    const user = new User({ email: "zub", password: "111" })
    await user.save()
    res.send({message: "saved successfully"})
}