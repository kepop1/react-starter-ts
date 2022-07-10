/* eslint-disable @typescript-eslint/no-var-requires */

const jwt = require('jsonwebtoken')
const { findUserById } = require('../helpers/helpers')

const AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret'

const authenticateUser = async (req, res, next) => {
  // Get the authorization header from the request, this is using Bearer {token} but it could also be
  // a header on the request such as req.headers.authToken
  const authorizationHeader = req.headers.authorization

  // Get the token from 'Bearer {token}' first, otherwise 'Bearer undefined' would still get through.
  const userAuthToken = authorizationHeader?.split(' ')[1]

  // Verify this is the same jwt token that we gave to the client when they logged in
  let jwtPayload

  try {
    jwtPayload = jwt.verify(userAuthToken, AUTH_SECRET)
  } catch (error) {
    // If the authToken has an error, e.g. it's 'undefined'
    return res.status(401).send({
      success: false,
      message: "You're not authorised to access this route",
    })
  }

  // JWT hasn't been tampered with and is valid
  let user = await findUserById(jwtPayload.id)

  if (!user) {
    return res.status(401).send({
      success: false,
      message: "You're not authorised to access this route",
    })
  }

  // Carry on and allow the user to access the rest of the routes
  next()
}

module.exports = authenticateUser
