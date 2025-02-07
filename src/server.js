const express = require('express')
require('express-async-errors');
const app = express()
const PORT = 3333
const routes = require('./routers')
const database = require('./database/sqlite')
const AppError = require('./utils/AppError')

app.use(express.json())
app.use(routes)
database()


app.use((error, request, response, next) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
  
    console.error(error)
  
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  })


app.listen(PORT, ()=> console.log("Server is ruinning"))