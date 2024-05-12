const productSchema  = require('../models/ProductModel');
const { create } = require('../models/UserModel');

const createProduct = async (req, res) => {

    const savedProduct = await productSchema.create(req.body);
    res.status(201).json({
        status: "success",
        data: savedProduct
    });


}
const getAllProducts = async (req, res) => {
    const products = await productSchema.find();
    res.status(200).json({
        status: "success",
        data: products
    });
}
module.exports = {
    createProduct,
    getAllProducts
}