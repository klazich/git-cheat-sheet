import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import { User } from './database/models/user'
import config from '../config'
const { jwt } = config

const verify = async (jwtPayload, done) => {
  try {
    return done(null, jwtPayload.sub)
  } catch (err) {
    return done(err)
  }
}

const options = {
  // Passport will get the JWT from the request header 'Authorization'.
  // it will fist look for the schema 'Bearer' then 'JWT'. e.g.
  // ... "Authorization": "Bearer <token>"
  // ... "Authorization": "JWT <token>"
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  ]),
  secretOrKey: jwt.secret,
}

passport.use('jwt', new JwtStrategy(options, verify))
