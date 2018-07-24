import passport from 'passport'
import { Router } from 'express'

import { User } from '../database/models/user'

const router = Router()

/**
 * GET - / 
 */
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
    failWithError: true,
  }),
  async (req, res) => {
    const id = req.user
    const user = await User.findById(id).exec()
    res.json({ id, username: user.username })
  }
)

export default router
