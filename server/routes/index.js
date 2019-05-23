const products = require('./products');
const router = require('express').Router();

router.use('/products',products);

module.exports = router;
