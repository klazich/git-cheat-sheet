import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const router = Router()

router.route('/register').post(
  passport.authenticate(
    'local-register',
    { session: false },
    async (req, res, next) => {
      res.json({
        message: 'Registration successful',
        user: req.user,
      })
    }
  )
)

router.route('/login').post(async (req, res, next) => {
  passport.authenticate('local-login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error)
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error)
        const token = await user.generateToken()
        return res.json({ token })
      })
    } catch (e) {
      return next(e)
    }
  })(rer, res, next)
})

export default router
