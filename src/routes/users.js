import passport from 'passport'
import { Router } from 'express'
const router = Router()

router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
    failWithError: true,
  }),
  async (req, res) => {
    const id = req.user
    res.json({ id })
  }
)

export default router
