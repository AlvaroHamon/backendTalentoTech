const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controllers/authController')
const auth = require('../middleware/authMiddleware')

router.post('/registro', registerUser)
router.post('/login', loginUser)
router.get('/usuario', auth, getUser)

module.exports = router
