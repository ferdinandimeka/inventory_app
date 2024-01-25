const Transaction = require('../models/transactionModel');
const AffiliateStats = require('../models/affiliateStats');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ProductStats = require('../models/productStatsModel');

exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    try {
        const productWithStats = await Promise.all(products.map(async (product) => {
            const stats = await ProductStats.find({ productId: product._id });
            return {
                ...product._doc,
                stats
            }
        }))
        res.status(200).json(productWithStats);
    } catch (error) {
        res.status(404)
        throw new Error('Products not found')
    }
});
