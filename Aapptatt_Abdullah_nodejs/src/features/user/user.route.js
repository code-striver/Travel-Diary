import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
const userController = new UserController()
const userRouter = express.Router()

userRouter.post('/signup', (req, res)=>{
    userController.signUp(req, res)
}
)
userRouter.post('/signin', (req, res)=>{
    userController.loginUser(req, res)
}
)

userRouter.get('/logout', userController.signOut)

userRouter.post('/search', jwtAuth, (req, res)=>{
    userController.searchUsers(req, res)})

userRouter.get('/all', (req, res)=>{
    userController.getAll(req, res)
})

userRouter.get('/userprofile', jwtAuth, (req, res)=>{
    userController.sendUserProfile(req, res)}
    )






export default userRouter