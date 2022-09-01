const fs = require('fs');
const data = require('./database');

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
    try {
      for (let i = 0; i < object.length; i++) {
        object[i].id = 1 + i;
      }
      console.log(`Saved ${object.length} products!`);
      await fs.promises.writeFile(this.file, JSON.stringify(object));
    } catch (error) {
      throw new Error(error, 'Error to save the product');
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      let idFound = content.find((prod) => prod.id === id);
      console.log(idFound);
    } catch (error) {
      throw new Error(error, 'Error to get the product by id');
    }
  }

  async getAll() {
    try {
      let content = await fs.promises.readFile(this.file, 'utf-8');
      console.log(content);
      return JSON.parse(content);
    } catch (error) {
      throw new Error(error, 'Error to get all the products');
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const deleted = content.filter((producto) => producto.id !== id);
      await fs.promises.writeFile(this.file, JSON.stringify(deleted, null, 4));
      console.log('Deleted');
    } catch (error) {
      throw new Error(error, 'Error to delete the product by id');
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, []);
      console.log('Deleted all the products');
    } catch (error) {
      throw new Error(error, 'Error to delete all the products');
    }
  }
}

const products = new Container('./products.txt');
products.save(data);
products.getById(2);
products.getAll();
products.deleteById(2);
products.deleteAll();