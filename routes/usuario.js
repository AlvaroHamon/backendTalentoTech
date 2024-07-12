import { Router } from 'express'
import { register, login, logout, getUser } from '../controllers/authController.js'
import auth from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/user', auth, getUser)

export default router
