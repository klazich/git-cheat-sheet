import { Router } from 'express'
import slugify from 'slugify'

import Snippet from '../database/models/snippet'

const router = Router()

router.get('/snippets.json', async (req, res, next) => {
  const snippets = await Snippet.find({ owner: 'DEFAULT' })
  // JSON response
  res.json({
    success: true,
    snippets: snippets.map(({ category, command, description, owner }) => ({
      category,
      command,
      description,
      owner,
    })),
  })
})

router.get('/categories.json', async (req, res, next) => {
  const categories = await Snippet.categories()
  // JSON response
  res.json({
    success: true,
    categories: categories.map(name => ({
      name,
      slug: slugify(name, { lower: true }),
    })),
  })
})

export default router
