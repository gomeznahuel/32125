const { getProducts, getProductsById, createNewProduct, updateProduct, deleteById, routeNotFound } = require('../controllers/products.controller');
const { Router } = require('express');
const isAdmin = require('../middlewares/isAdmin');
const productRoute = Router();

productRoute.get('/', getProducts);           
productRoute.get('/:id', getProductsById);
productRoute.post('/', isAdmin, createNewProduct);
productRoute.put('/:id', isAdmin, updateProduct);
productRoute.delete('/:id', isAdmin, deleteById);
productRoute.use(routeNotFound);

module.exports = productRoute;
