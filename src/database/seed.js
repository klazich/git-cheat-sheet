import snippets from '../public/snippets'
import Snippet from './models/snippet'

if (!Snippet.findOne({ owner: 'DEFAULT' })) {
  snippets.forEach(async ({ category, command, description }) => {
    const snip = new Snippet({
      category,
      command,
      description,
      owner: 'DEFAULT',
    })
    await snip.save()
  })
}
