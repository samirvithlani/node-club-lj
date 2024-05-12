const router = require('express').Router();

const productController = require('../controllers/ProductController');
router.post('/product', productController.createProduct);
router.get('/product', productController.getAllProducts);
module.exports = router;