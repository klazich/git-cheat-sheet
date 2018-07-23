import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '../database/models/user'

const verify = async (req, username, password, done) => {
  try {
    const userDocument = await User.findOne({ username }).exec()
    // Check if username already exists.
    if (userDocument) {
      return done(null, false, { message: 'That username is taken' })
    }
    // Create and save the new user to the database.
    const user = new User({ username, password })
    await user.save()
    // Passport will add a 'user' property to the request object and
    // and pass it to the next middleware.
    //
    // Generate a Token to send back in the response.
    return done(null, await user.generateToken())
  } catch (err) {
    // Send any errors back to passport.
    return done(err)
  }
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}

passport.use('local-register', new LocalStrategy(options, verify))
