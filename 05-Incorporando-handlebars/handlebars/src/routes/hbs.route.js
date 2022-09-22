const { Router } = require('express');
const hbsRouter = Router();
const Products = require('../class/Products');

hbsRouter.get('/', (req, res) => {
  res.render('partials/form', { layout: 'index' });
});

hbsRouter.get('/products', async (req, res) => {
  const products = Products.getProducts;
  res.render('partials/view-products', { products });
});

hbsRouter.post('/products', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProduct = { title, price, thumbnail };
  await Products.add(newProduct);

  res.redirect('/products');
});

module.exports = hbsRouter;
