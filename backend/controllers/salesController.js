import OverallStats from "../models/overallStats.js";

export const getSales = async (req, res) => {
    try {
        const sales = await OverallStats.find();
        res.status(200).json(sales[0]);
    } catch (error) {
        res.status(404)
        throw new Error('Sales not found')
    }
}