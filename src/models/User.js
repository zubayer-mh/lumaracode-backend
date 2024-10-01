import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    email: String,
    password: String
})

export const User = mongoose.model("user", UserSchema)