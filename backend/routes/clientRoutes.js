const express = require('express');
const { getProducts, getTransactions, getCustomers,
getGeography } = require('../controllers/clientController');
const router = express.Router();

router.get('', getProducts)
// router.get('/transactions', getTransactions)
// router.get('/customers', getCustomers)
// router.get('/geography', getGeography)

module.exports = router;