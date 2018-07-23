import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import { User } from '..'
import config from '../../config'
const { jwt } = config

const verify = async (req, jwtPayload, done) => {
  try {
    // const userDocument = await User.findById(jwtPayload.sub).exec()
    // return userDocument
    //   ? done(null, userDocument)
    //   : done(null, false, { message: 'Weird... User not in the database' })
    return done(null, jwtPayload.user)
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
