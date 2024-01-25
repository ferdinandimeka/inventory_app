import express from 'express';
import { registerUser, loginUser, logOutUser, getUser, loggedInStatus,
updateUser, changePassword, forgotPassword, resetPassword } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logOutUser)
router.get('/profile', protect, getUser)
router.get('/loggedin', loggedInStatus)
router.patch('/updateUser', protect, updateUser)
router.patch('/password-change', protect, changePassword)
router.post('/password-forgot', forgotPassword)
router.put('/password-reset/:resetToken', resetPassword)

export default router;