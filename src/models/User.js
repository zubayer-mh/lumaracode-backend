import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    email: String,
    image: String,
    password: String,
    verified: Boolean,
    provider: String
})

export const User = mongoose.model("user", UserSchema)