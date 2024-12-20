const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const testingRouter = require('./controllers/testing')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
logger.info('connecting to MongoDB')
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use(express.static('../frontend/dist'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/', commentsRouter)
app.use('/api/testing', testingRouter)

app.get('/health', (_req, res) => res.send('ok'))
app.get('/awesome_feature', (_req, res) => res.send('🚀'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
