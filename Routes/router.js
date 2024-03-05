const userController = require('../Controlls/usercontrolls')
const projectController = require('../Controlls/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddlewares')
const multerConfig = require('../Middlewares/multerMiddleware')

const express = require('express');

const router = new express.Router();

// router.post('/user/register',userController.register)

router.post('/user/login', userController.login)

router.post('/project/add', jwtMiddleware, multerConfig.single('projectImage'), projectController.addproject)

router.get('/projects/allproject',projectController.getallproject)

router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteuserproject)

module.exports = router;