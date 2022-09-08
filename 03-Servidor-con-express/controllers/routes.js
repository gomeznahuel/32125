const Container = require('../class/Container');

// Container
const file = new Container('./database/database.txt');
const getProductsFromDB = file.getAll();

const getProducts = async (req, res) => {
  try {
    const result = await getProductsFromDB;
    res.json(result);
  } catch (error) {
    throw new Error(error, 'Error to get all products.');
  }
};

const getProductRandom = async (req, res) => {
  try {
    const result = await getProductsFromDB;
    const randomProduct = result[Math.floor(Math.random() * result.length)];
    res.json(randomProduct);
  } catch (error) {
    throw new Error(error, 'Error to get a random product.');
  }
};

const getStartPage = (req, res) => {
  res.send(
    'Use /products to see all products or /randomProduct to see a random product.'
  );
};

module.exports = { getProducts, getProductRandom, getStartPage };
