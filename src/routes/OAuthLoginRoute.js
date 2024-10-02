import express from 'express'
import { login, OAuthLogin, signUp } from '../controllers/userController.js'

const router = express.Router()

router.post("/", OAuthLogin)

export default router 