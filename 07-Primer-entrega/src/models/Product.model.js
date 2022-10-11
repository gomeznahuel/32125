const date = require('../helpers/date');

class ProductModel {
  constructor(name, description, code, thumbnail, price, stock) {
    this.timestamp = date;
    this.name = name;
    this.description = description;
    this.code = code;
    this.thumbnail = thumbnail;
    this.price = price;
    this.stock = stock;
  }
}

module.exports = ProductModel;
