const Cart = require('../class/Cart.class');

// Database of products
const cart = new Cart('src/database/cart.db.json');

const getCart = async (req, res) => {
  const { id } = req.params;

  const result = await cart.getCart(id);
  res.json(result);
}

const createCart = async (req, res) => {
  await cart.createCart();
  res.json({ message: 'Cart created' });
}

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  const result = await cart.addProductToCart(id, productId);
  res.json(result);
}

const deleteCart = async (req, res) => {
  const { id } = req.params;
  const result = await cart.deleteCart(id);

  res.json(result);
}

const deleteProductFromCart = async (req, res) => {
  const { id, productId } = req.params;
  const result = await cart.deleteProductFromCart(id, productId);

  res.json(result);
}

const routeNotFound = (req, res) => res.status(404).json({ error: 'Route not found' });

module.exports = { createCart, getCart, addProductToCart, deleteCart, deleteProductFromCart, routeNotFound };