import express from 'express';
import { getAdmin, getPerformance } from '../controllers/managementController.js';
const router = express.Router();

router.get('/admin', getAdmin)
router.get('/performance/:id', getPerformance)

export default router;