import passport from 'passport'
import { Router } from 'express'

import User from '../database/models/user'
import Snippet from '../database/models/snippet'
import snippets, { categories } from '../public/snippets'

const router = Router()

/**
 * GET - / 
 */
router.get('/', async (req, res) => {
  const id = req.decoded.id
  console.log(req.headers)
  try {
    const user = await User.findById(id).exec()
    console.log(user)
    const userSnippets = await user.snippets()
    const defaultSnippets = await Snippet.snippets()

    res.json({
      success: true,
      categories,
      snippets: [...userSnippets, ...defaultSnippets],
    })
  } catch (err) {
    throw err
  }
})

// router.post(
//   '/',
//   passport.authenticate('jwt', { session: false, failWithError: true }),
//   async (req, res) => {}
// )

export default router
