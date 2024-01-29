import express from 'express';
import { getUser } from '../controllers/generalController.js';
const router = express.Router();

router.get('/user', getUser)

export default router;