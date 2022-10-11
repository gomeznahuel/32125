const Product = require('../class/Product.class');
const { itemsValidate } = require('../utils/validations');

// Database of products
const ProductClass = new Product('src/database/products.db.json');

const getProducts = async (req, res) => {
  const result = await ProductClass.getAll();
  await res.json(result);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const result = await ProductClass.getById(id);
  res.json(result);
};

const createNewProduct = async (req, res) => {
  const { name, description, code, thumbnail, price, stock } = req.body;

  const newProduct = itemsValidate( name, description, code, thumbnail, price, stock );
  if (newProduct.error) return res.status(400).json(newProduct);
  else res.json(await ProductClass.save(newProduct));
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, code, thumbnail, price, stock } = req.body;
  const newProduct = itemsValidate( name, description, code, thumbnail, price, stock );

  if (newProduct.error) return res.status(400).json(newProduct);
  else res.json(await ProductClass.updateProduct(id, newProduct)); 
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await ProductClass.deleteById(id);
  res.json(result);
};

const routeNotFound = (req, res) => res.status(404).json({ error: 'Route not found' });

module.exports = { getProducts, getProductsById, createNewProduct, updateProduct, deleteById, routeNotFound };
