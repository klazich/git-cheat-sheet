import { Router } from 'express'

import snippets, { categories } from '../public/snippets'

const router = Router()

/* GET home page. */
router.get('/snippets.json', function(req, res, next) {
  res.json({ categories, snippets })
})

export default router
