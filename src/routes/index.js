import { loginController } from '@/controllers/loginController';
import refreshTokenController from '@/controllers/refreshTokenController';
import { signUpController } from '@/controllers/signUpController';
import { userController } from '@/controllers/userController';
import { authMiddleWare } from '@/middleware/authMiddleware';
import express from 'express'

const router = express.Router();


router.post("/login", loginController)
router.post('/signup', signUpController)
router.get('/users', authMiddleWare, userController)
router.post('/refreshToken', refreshTokenController)

export default router
