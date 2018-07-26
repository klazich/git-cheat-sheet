import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import config from '../config'
const { jwt } = config

const verify = async (jwtPayload, done) => {
  try {
    return done(null, jwtPayload.id)
  } catch (err) {
    return done(err)
  }
}

const options = {
  // Passport will get the JWT from the request header 'Authorization'.
  // it will fist look for the schema 'Bearer' then 'JWT'.
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(), // "Authorization": "Bearer <token>"
    ExtractJwt.fromAuthHeaderWithScheme('JWT'), // "Authorization": "JWT <token>"
  ]),
  secretOrKey: jwt.secret,
}

passport.use('jwt', new JwtStrategy(options, verify))
