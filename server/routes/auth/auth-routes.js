import express from 'express';
import { signup, login, logout, authMiddleware } from '../../controllers/auth/auth-controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user,
    });
});



export default router;