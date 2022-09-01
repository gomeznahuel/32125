const Container = require('./class');
const data = require('./database');

const products = new Container('./database.txt');
products.save(data);
products.getById(2);
products.getAll();
products.deleteById(2);
products.deleteAll();