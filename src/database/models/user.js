import mongoose, { Schema } from 'mongoose'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export const UserSchema = Schema({
  hash: {
    type: String,
  },
  username: {
    type: String,
    index: {
      unique: true,
    },
    unique: true,
    dropDups: true,
    required: true,
  },
})

/* User Static Methods */
UserSchema.statics = {
  /**
   * Static method on the User class for generating
   * password hashes.
   *
   * (An argument could be made to inline this into the middleware bellow)
   */
  async generateHash(password) {
    return argon2.hash(password, { type: argon2.argon2id })
  },
}

/* User Instance Methods */
UserSchema.methods = {
  /**
   * Password authentication for User instances.
   */
  async authenticate(password) {
    return argon2.verify(this.hash, password)
  },
  /**
   * Json web tokenization for User instances.
   */
  async generateToken() {
    return await jwt.sign(
      { id: this._id }, // JWT payload
      process.env.JWT_SECRET, // JWT secret
      { expiresIn: '12h' } // expires in 12 hours
    )
  },
}

/**
 * User Virtual Attributes
 *
 * This `password` virtual attribute works as a temporary holder for the
 * password and also as a flag to mongoose middleware hooks (see the User
 * Middleware below on how this is used).
 *
 * Mongoose virtual attributes do not get persisted into the Mongo database
 * therefore.
 */
UserSchema.virtual('password').set(async function(password) {
  this._password = password
})

/**
 * User Document Middleware (pre-save)
 *
 * This function is called on the User document before it is saved to the
 * database. If a password is being saved the function will generate and
 * return a hash of the password.
 */
UserSchema.pre('save', async function(next) {
  if (this._password) {
    try {
      const hash = await User.generateHash(this._password)
      this.hash = hash
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    } finally {
      delete this._password // I'm not sure if this is necessary.
    }
  }
})

// MODEL CREATION AND EXPORT
export const User = mongoose.model('User', UserSchema)
