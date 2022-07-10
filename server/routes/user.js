/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { addUser, findUserByEmail } = require('../helpers/helpers')

const router = express.Router()

const AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret'

router.post('/register', async (req, res) => {
  // Get the body from the information sent in by the user/client.
  const { firstName, email, password } = req.body

  if (!firstName || !email || !password)
    return res.status(400).json({
      success: false,
      message: 'Something is wrong with the data you have sent',
    })

  const existingUser = await findUserByEmail(email)

  if (existingUser)
    return res.status(400).json({
      success: false,
      message: 'Something is wrong with the data you have sent',
    })

  // Auto generate the password hash using bcrypt
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    id: uuidv4(),
    email: email,
    password: passwordHash,
  }

  try {
    const successfullyAddedUser = await addUser(newUser)

    if (successfullyAddedUser) {
      res
        .status(201)
        .json({ success: true, message: `${email} has been created` })
    } else {
      throw new Error('Could not add user')
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: true, message: `Something has gone wrong!` })
  }
})

router.post('/login', async (req, res) => {
  // Get the body from the information sent in by the user/client.
  const { email, password } = req.body

  // If it doesn't exist then handle it
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: 'Something is wrong with the data you have sent',
    })

  // If the data exists, find the user
  const user = await findUserByEmail(email)

  // If the user doesn't exist then handle that
  if (!user)
    return res
      .status(404)
      .json({ success: false, message: 'This user does not exist' })

  // Check that the password sent in is valid
  const validPassword = await bcrypt.compare(password, user.password)

  // If the password is not valid, then handle it
  if (!validPassword)
    return res.status(400).json({
      success: false,
      message: 'Something is wrong with your email or password',
    })

  // If the password is correct, and the user has been found, then create an authentication token
  const authToken = await jwt.sign(
    { id: user.id, email: user.email },
    AUTH_SECRET,
    { expiresIn: '1h' },
  )

  // Send back a success with the auth token attached
  return res.status(200).json({ success: true, token: authToken })
})

module.exports = router
