const { Router } = require('express')
const userRouter = Router()
const UserController = require('../controllers/UserController')
const userController = new UserController()

userRouter.post('/', userController.create)
userRouter.get('/:id', userController.showOne)
userRouter.put('/:id', userController.update)
userRouter.get('/', userController.show)


module.exports = userRouter