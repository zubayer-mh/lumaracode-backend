import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    verified: Boolean
})

export const User = mongoose.model("user", UserSchema)