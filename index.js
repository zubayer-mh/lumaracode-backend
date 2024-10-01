import express from 'express'
import { User } from './src/models/User.js'
import { connectDB } from './src/utils/get-db-connection/getDBConnection.js'
import { auth } from './src/middlewares/auth.js'
export const app = express()
var cors = require('cors')
app.use(cors({ origin: "*" }))

const port = 5000

import signupRoute from "./src/routes/userRoutes.js"

app.use("/sign-up", signupRoute)


app.get('/', auth, async (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  await connectDB()
  console.log(`Example app listening on port ${port}`)
})