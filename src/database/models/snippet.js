import mongoose, { Schema } from 'mongoose'

export const SnippetSchema = Schema({
  category: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: String,
})

SnippetSchema.statics = {
  async categories(owner = 'DEFAULT') {
    const docs = await Snippet.find({ owner }).exec()
    return docs.reduce(
      (acc, snip) =>
        !acc.includes(snip.category) ? [...acc, snip.category] : acc,
      []
    )
  },

  async snippets(owner = 'DEFAULT') {
    const docs = await Snippet.find({ owner }).exec()
    return docs
  },
}

// MODEL CREATION AND EXPORT
const Snippet = mongoose.model('Snippet', SnippetSchema)
export default Snippet
