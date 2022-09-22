const Container = require('../class/Container');

// Container
const file = new Container('./database/database.txt');

const getProducts = async (req, res) => {
  const result = await file.getAll();
  res.json(result);
};

const getProductRandom = async (req, res) => {
  const result = await file.getAll();
  const randomProduct = result[Math.floor(Math.random() * result.length)];
  res.json(randomProduct);
};

const getStartPage = (req, res) => {
  res.send('Use /products to see all products or /randomProduct to see a random product.');
};

module.exports = { getProducts, getProductRandom, getStartPage };
