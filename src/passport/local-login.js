import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '../database/models/user'

const verify = async (req, username, password, done) => {
  try {
    const userDocument = await User.findOne({ username }).exec()
    // Check if the user exist in the database.
    if (!userDocument) {
      return done(null, false, { message: 'Incorrect *username / password' })
    }
    // Authenticate the user with the provided password.
    const authenticated = await userDocument.authenticate(password)
    return authenticated
      ? // Send back the JWT if the password authenticates.
        done(null, await userDocument.generateToken())
      : // If authentication failed:
        done(null, false, { message: 'Incorrect username / *password' })
  } catch (err) {
    // Let passport handle any errors.
    return done(err)
  }
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}

passport.use('local-login', new LocalStrategy(options, verify))
