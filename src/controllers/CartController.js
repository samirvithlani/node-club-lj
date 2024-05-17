const cartSchema = require('../models/CartModel');


const addToCart = async (req, res) => {


    //req.body :user, product

    const davedCart = await cartSchema.create(req.body);
    res.status(201).json({
        status: "success",
        data: davedCart
    })
}

const getCart = async (req, res) => {

    const cart = await cartSchema.find().populate("user").populate("products");
    res.status(200).json({
        status: "success",
        data: cart
    })


}
module.exports = {
    addToCart,
    getCart
}