import express from 'express';
import { requestJwtRefreshToken } from '../controllers/authController.js';

const router = express.Router();

router.get('/refreshToken', requestJwtRefreshToken);



export default router;