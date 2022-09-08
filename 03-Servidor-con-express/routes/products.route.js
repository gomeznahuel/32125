const { getProducts, getProductRandom, getStartPage } = require('../controllers/routes');
const { Router } = require('express');
const router = Router();

router.get('/', getStartPage);
router.get('/products', getProducts);
router.get('/randomProduct', getProductRandom);

module.exports = router;
