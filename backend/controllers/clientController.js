// import AffiliateStats from '../models/affiliateStats';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import ProductStats from '../models/productStatsModel.js';
import User from '../models/userModel.js';
import Transaction from '../models/transactionModel.js';
import countryISO2to3 from 'country-iso-2-to-3'

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

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

export const getCustomers = asyncHandler(async (req, res) => {

    const customers = await User.find({ role: "user" });

    if (customers) {
        res.status(200).json(customers);
    } else {
        res.status(404)
        throw new Error('Customers not found')
    }
});

export const getTransactions = asyncHandler(async (req, res) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize, sort = null, search = "" } = req.query;

        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
             $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
             ],
        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404)
        throw new Error('Transactions not found')
    }
});

export const getGeography = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = countryISO2to3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }

            acc[countryISO3] += 1;
            return acc;   
        }, {});
        //console.log(mappedLocations);

        const locations = Object.entries(mappedLocations).map(([country, count]) => ({
            id: country,
            value: count,
        }));

        res.status(200).json(locations);
    } catch(error) {
        res.status(404)
        throw new Error('Geography not found')
    }
});