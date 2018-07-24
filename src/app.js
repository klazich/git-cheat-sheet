import 'dotenv/config' // required for Dotenv

import express, { json, urlencoded, Router } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import passport from 'passport'

import indexRouter from './routes/index'
import authRouter from './routes/auth'
import securedRouter from './routes/secure'
import config from '../config'

const {
  app: { port },
} = config

// INITIALIZE A NEW EXPRESS APP
var app = express()

// LOAD EXPRESS MIDDLEWARE
app.use(logger('dev')) // request logging with morgan
app.use(json()) // content-type: application/json
app.use(urlencoded({ extended: false })) // content-type: application/x-www-form-urlencoded
app.use(cookieParser()) // read cookies
app.use(cors()) // cross-origin resource sharing middleware

// ASSIGN ROUTERS
const router = Router()

router.use('/', indexRouter)
router.use('/auth', authRouter)
router.use('/me', securedRouter) // JWT secured

app.use('/api', router)

// LOAD MONGOOSE
import './database'

// LOAD PASSPORT & INITIALIZE
import './passport'
app.use(passport.initialize())

// HANDLE ERRORS
app.use(function(req, res, next) {
  // Catch 404 and forward to error handler.
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
// Send errors as json and not html.
app.use(function(err, req, res, next) {
  // console.error(err) // Log the error.
  res.status(err.status || 500).json(err.toString())
})

// START THE SERVER
app.listen(port, function() {
  console.log('-- The API server is listening on port', port)
})

export default app
