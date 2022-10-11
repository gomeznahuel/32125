const { createCart, getCart, addProductToCart, deleteCart, deleteProductFromCart, routeNotFound } = require('../controllers/cart.controller');
const { Router } = require('express');
const cartRoute = Router();

cartRoute.get('/:id/products', getCart);
cartRoute.post('/', createCart);
cartRoute.post('/:id/products', addProductToCart);
cartRoute.delete('/:id', deleteCart);
cartRoute.delete('/:id/products/:productId', deleteProductFromCart);
cartRoute.use(routeNotFound);

module.exports = cartRoute;