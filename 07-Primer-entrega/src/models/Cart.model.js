const date = require('../helpers/date');

class CartModel {
  constructor() {
    this.timestamp = date;
    this.products = []
  }
}

module.exports = CartModel;
