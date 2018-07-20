import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '..'

const verify = async (req, username, password, done) => {
  try {
    const userDocument = await User.findOne({ username }).exec()
    if (!userDocument) {
      return done(null, false, { message: 'Incorrect *username / password' })
    }
    const authenticated = await userDocument.authenticate(password)
    return authenticated
      ? done(null, userDocument)
      : done(null, false, { message: 'Incorrect username / *password' })
  } catch (err) {
    done(err)
  }
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}

passport.use('local-login', new LocalStrategy(options, verify))
