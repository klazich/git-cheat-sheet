import 'dotenv/config' // required for Dotenv

import { join } from 'path'

import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import passport from 'passport'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import apiRouter from './routes/api'

var app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
// app.use(express.static(join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'build')))

// app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

// Setup mongoose and connect to MongoDB
import './database'
// Setup Passport strategies
import './passport'

app.use(passport.initialize())

// CHECK //////////////////////////////////////////////////////////////////////
app.get('/checking', function(req, res) {
  res.json({
    Tutorial: 'Welcome to the Node express JWT Tutorial',
  })
})
///////////////////////////////////////////////////////////////////////////////

const PORT = process.env.APP_PORT

app.listen(PORT, function() {
  console.log('-- Server is running on Port', PORT)
})

export default app
