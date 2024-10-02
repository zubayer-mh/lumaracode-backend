import express from 'express'
import { User } from './src/models/User.js'
import { connectDB } from './src/utils/get-db-connection/getDBConnection.js'
import { auth } from './src/middlewares/auth.js'
export const app = express()
import cors from 'cors'
app.use(cors({ origin: "*" }))

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000

import signupRoute from "./src/routes/signupRoutes.js"
import emailVerificationRoute from "./src/routes/emailVerificationRoute.js"

app.use("/sign-up", signupRoute)
app.use("/email-verification", emailVerificationRoute)


app.get('/', auth, async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  await connectDB()
  console.log(`listening on port ${port}`)
})