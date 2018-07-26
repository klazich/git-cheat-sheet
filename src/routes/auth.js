import { Router } from 'express'

import User from '../database/models/user'

const router = Router()

// const bldres = (success = false, auth = false, ...props) =>
//   props.reduce(
//     (acc, prop) => ({
//       [prop[0]]: prop[1],
//       ...acc,
//     }),
//     { success, auth }
//   )

/**
 * POST - /register 
 *
 * Register a new user with given username and password.
 */
router.post('/register', async (req, res) => {
  // Extract the username and password from the request body.
  const {
    body: { username, password },
  } = req

  // Verify that a username and password were provided.
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a username & password to register.',
    })
  }

  // Wrap async/await code in try/catch to catch rejected promises.
  try {
    // Check if the username is already in the database.
    const userDocument = await User.findOne({ username }).exec()
    if (userDocument) {
      return res.status(401).json({
        success: false,
        message: 'That username is already registered.',
      })
    }

    // Create and save the new user.
    const user = new User({ username, password })
    await user.save()

    // Send the JWT with success (200).
    return res.status(200).json({
      success: true,
      auth: true,
      token: await user.generateToken(), // Generate the user's JWT.
    })

    // Catch and return any server related errors.
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    })
  }
})

/**
 * POST - /api/token 
 *
 * open route
 *
 * Generate a new JWT for given registered user.
 */
router.post('/token', async (req, res) => {
  // Extract the username and password from the request body.
  const {
    body: { username, password },
  } = req

  // Verify that a username and password were provided.
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a username & password to login.',
    })
  }

  // Wrap async/await code in try/catch to catch rejected promises.
  try {
    // Check that the username exists in the database.
    const userDocument = await User.findOne({ username }).exec()
    if (!userDocument) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect *username or password.',
      })
    }

    // Authenticate the user with the provided password.
    const authenticated = await userDocument.authenticate(password)

    return authenticated
      ? // Send the JWT with success (200) if password authenticates.
        res.status(200).json({
          success: true,
          message: `Username: '${username}', successfully issued a token.`,
          token: await userDocument.generateToken(), // Generate the user's JWT.
        })
      : // Send Unauthorized (401) if password authentication fails.
        res.status(401).json({
          success: false,
          message: 'Incorrect username or *password.',
        })

    // Catch and return any server related errors.
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.toString(),
    })
  }
})

export default router
