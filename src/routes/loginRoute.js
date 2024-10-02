import express from 'express'
import { login, signUp } from '../controllers/userController.js'

const router = express.Router()

router.post("/", login)

export default router 