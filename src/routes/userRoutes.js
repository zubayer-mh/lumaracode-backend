import express from 'express'
import { signUp } from '../controllers/userController.js'

const router = express.Router()

router.get("/", signUp)

export default router 