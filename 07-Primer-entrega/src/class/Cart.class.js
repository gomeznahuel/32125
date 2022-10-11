const fs = require('fs');

// Cart Model
const CartModel = require('../models/Cart.model');

// Product Class
const ProductClass = require('../class/Product.class');

// Database of products
const productDB = 'src/database/products.db.json';

class Cart {
  constructor(filePath) {
    this.filePath = filePath;
    this.newCart = new CartModel();
  }

  async #readFile(filePath) {
    try {
      const file = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(file);
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const content = await this.#readFile(this.filePath);

      if (content.length !== 0) await fs.promises.writeFile(this.filePath, JSON.stringify([...content, { ...this.newCart, id: content[content.length - 1].id + 1 }], null, 2), "utf-8");
      else await fs.promises.writeFile(this.filePath, JSON.stringify([{...this.newCart, id: 1}]), "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

  async getCart(id) {
    try {
      const content = await this.#readFile(this.filePath);
      const cart = content.find((cart) => cart.id === parseInt(id));
      if (cart === undefined) return { error: "cart not found" };
      else return cart;
    } catch (error) {
      console.log(error);
    }
  }

  // Add a product to the cart
  async addProductToCart(id, productId) {
    try {
      const content = await this.#readFile(this.filePath);
      const cartId = content.findIndex((cart) => cart.id === parseInt(id));

      if (cartId === -1) return { error: `cart ${id} not found.` };

      const product = await new ProductClass(productDB).getById(productId);

      if (product.error) {
        return { error: product.error };
      } else {
        content[cartId].products.push(product);
        await fs.promises.writeFile(this.filePath, JSON.stringify(content, null, 2));
        return content[cartId];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id) {
    try {
      const content = await this.#readFile(this.filePath);
      const cartId = content.findIndex((cart) => cart.id === parseInt(id));
      if (cartId === -1) return { error: "cart not found" };
      content.splice(cartId, 1);
      await fs.promises.writeFile(this.filePath,JSON.stringify(content, null, 2));
      return { message: "cart deleted" };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(id, productId) {
    try {
      const content = await this.#readFile(this.filePath);
      const cartId = content.findIndex((cart) => cart.id === parseInt(id));
      if (cartId === -1) return { error: "cart not found" };

      const product = content[cartId].products.findIndex((product) => product.id === parseInt(productId));
      if (product === -1) return { error: "product not found" };

      content[cartId].products.splice(product, 1);

      await fs.promises.writeFile(this.filePath, JSON.stringify(content, null, 2));
      return content[cartId];
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = Cart;