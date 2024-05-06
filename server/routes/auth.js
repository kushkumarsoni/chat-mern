const express = require('express')
const { registerUser,
    checkEmail, 
    checkPassword, 
    getUserDetail, 
    logout, 
    updateUserDetail } = require('../controllers/authController')
const router = express.Router()

router.post('/register',registerUser)
router.post('/check-email',checkEmail)
router.post('/check-password',checkPassword)
router.get('/user',getUserDetail)
router.post('/logout',logout)
router.post('/profile/update',updateUserDetail)

module.exports = router