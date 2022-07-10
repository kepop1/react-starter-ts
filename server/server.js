/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express')
const cors = require('cors')

const UserRoutes = require('./routes/user')
const authenticateUser = require('./middlewares/authenticateUser')

const PORT = process.env.PORT || 4000

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(UserRoutes)

app.use(authenticateUser)

//Technically a route that will not be reached if you're not authenticated
app.get('/route', (_, res) => {
  return res.status(200).json({
    success: true,
    message: "You're authenticated well done!",
    data: { info: 'hello world' },
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
