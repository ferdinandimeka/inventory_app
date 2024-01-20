const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { registerUser, loginUser, logOutUser, getUser, updateUser, loggedInStatus,
changePassword, resetPassword, forgotPassword } = require('../controllers/userController');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logOutUser)
router.get('/profile', protect, getUser)
router.get('/loggedin', loggedInStatus)
router.patch('/updateUser', protect, updateUser)
router.patch('/password-change', protect, changePassword)
router.post('/password-forgot', forgotPassword)
router.put('/password-reset/:resetToken', resetPassword)

module.exports = router;