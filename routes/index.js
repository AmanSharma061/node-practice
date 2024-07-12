import express from 'express'
import {loginController} from '../controllers/loginController.js';
import {signUpController} from '../controllers/signUpController.js';
import {authMiddleWare} from '../middleware/authMiddleware.js';
import {userController} from '../controllers/userController.js';
import refreshTokenController from '../controllers/refreshTokenController.js';

const router = express.Router();


router.post("/login", loginController)
router.post('/signup', signUpController)
router.get('/users', authMiddleWare, userController)
router.post('/refreshToken', refreshTokenController)

export default router
