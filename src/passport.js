import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import config from '../config'
const { jwt } = config

const verify = async (req, jwtPayload, done) => {
  try {
    return done(null, jwtPayload.sub)
  } catch (err) {
    return done(err)
  }
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.secret,
  passReqToCallback: true,
}

passport.use('jwt', new JwtStrategy(options, verify))
