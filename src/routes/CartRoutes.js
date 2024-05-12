const router = require('express').Router();
const cartController = require('../controllers/CartController');
router.post('/cart', cartController.addToCart);
router.get('/cart', cartController.getCart);
module.exports = router;