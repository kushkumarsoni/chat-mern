const express = require('express')
const { registerUser, checkEmail, checkPassword } = require('../controllers/authController')
const router = express.Router()

router.post('/register',registerUser)
router.post('/check-email',checkEmail)
router.post('/check-password',checkPassword)

module.exports = router