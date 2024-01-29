import express from 'express';
import { getProducts, getCustomers, getTransactions } from '../controllers/clientController.js';
const router = express.Router();

router.get('/products', getProducts)
router.get('/transactions', getTransactions)
router.get('/customers', getCustomers)
// router.get('/geography', getGeography)

export default router;