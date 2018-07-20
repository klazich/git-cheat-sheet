import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import { User } from '..'

const verify = async (req, username, password, done) => {
  const userDocument = await User.findOne({ username }).exec()
  if (userDocument) {
    return done(null, false, { message: 'That username is taken' })
  }
  const user = new User({ username, password })
  await user.save()
  return done(null, user)
}

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}

passport.use('local-register', new LocalStrategy(options, verify))
