const { Router } = require('express')
const routes = Router()

const userRouter = require('./userRouters')
const movieRouter = require('./movieRouters')


routes.use('/users', userRouter)
routes.use('/movie', movieRouter)

module.exports = routes