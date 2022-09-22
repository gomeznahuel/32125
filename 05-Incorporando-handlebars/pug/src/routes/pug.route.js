const { Router } = require('express');
const pugRouter = Router();
const Products = require('../class/Products');

pugRouter.get('/', (req, res) => {
  res.render('insert-product');
});

pugRouter.get('/products', async (req, res) => {
  const products = Products.getProducts;
  res.render('view-products', { products });
});

pugRouter.post('/products', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProduct = { title, price, thumbnail };
  await Products.add(newProduct);

  res.redirect('/products');
});

module.exports = pugRouter;
