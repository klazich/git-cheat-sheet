import 'dotenv/config' // required for Dotenv

import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import passport from 'passport'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import apiRouter from './routes/api'
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
// app.use('/', indexRouter)
app.use('/me', usersRouter) // JWT secured
app.use('/api', apiRouter)

// LOAD MONGOOSE
import './database'

// LOAD PASSPORT & INITIALIZE
import './passport'
app.use(passport.initialize())

app.get('/up', function(req, res) {
  res.status(200).json({ isUp: true })
})

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Send errors as json and not html.
app.use(function(err, req, res, next) {
  console.error(err) // Log the error.
  res.status(err.status || 500).json({ error: err.toString() })
})

// START THE SERVER
const PORT = port
app.listen(PORT, function() {
  console.log('-- Server is running on Port', PORT)
})

export default app
