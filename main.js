#!/usr/bin/env node

try {
  const app = require('./lib/app')
} catch (err) {
  console.error('The /lib directory was not loaded. Did it get built?')
  process.exit(1)
}
app.listen(port, () => {
  console.log(`Server started ~ listening on 3001`)
})
