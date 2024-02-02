import express from 'express';
import { getAdmin } from '../controllers/managementController.js';
const router = express.Router();

router.get('/admin', getAdmin)

export default router;