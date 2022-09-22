const { Router } = require('express');
const ejsRouter = Router();
const Products = require('../class/Products');

ejsRouter.get('/', (req, res) => {
  res.render('index');
});

ejsRouter.get('/products', (req, res) => {
  const products = Products.getProducts
  res.render('partials/products', { products });

});

ejsRouter.post('/products', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  await Products.add({ title, price, thumbnail });
  res.redirect('/products');
});

module.exports = ejsRouter;
