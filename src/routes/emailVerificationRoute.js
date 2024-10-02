import express from 'express'
import { emailVerification } from '../controllers/userController.js'

const router = express.Router()

router.put("/", emailVerification)

export default router 