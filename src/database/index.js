import mongoose from 'mongoose'

import config from '../../config'
const { host, port, name, auth, user, pass } = config.db

// configure mongoose
mongoose.Promise = global.Promise
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

// setup connection arguments
const connectionString = `mongodb://${host}:${port}/${name}`
const connectionOptions = {
  useNewUrlParser: true,
  user: auth && user,
  pass: auth && pass,
}

// create connection
mongoose.connect(
  connectionString,
  connectionOptions
)

mongoose.connection.dropDatabase()

// mongoose hooks
mongoose.connection
  .on('error', err => {
    if (err.message.indexOf('ECONNREFUSED') !== -1) {
      console.error(
        "!! Could not establish connection to a MongoDB service. Maybe it's not running?"
      )
      process.exit(1)
    } else {
      throw err
    }
  })
  .on('connected', () => {
    console.log(`-- Connected to the MongoDB service successfully.`)
  })
  .on('disconnected', () => {
    console.info(`-- Disconnected from the MongoDB service.`)
  })
