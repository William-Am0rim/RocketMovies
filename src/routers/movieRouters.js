const Router = require('express')
const movieRoutes = Router()
const MovieController = require('../controllers/MovieController')
const movieController = new MovieController()


movieRoutes.post('/:user_id', movieController.create)
movieRoutes.get('/:id', movieController.show)
movieRoutes.delete('/:id', movieController.delete)

module.exports = movieRoutes