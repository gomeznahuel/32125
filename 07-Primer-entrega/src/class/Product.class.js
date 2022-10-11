const fs = require('fs');
const ProductModel = require('../models/product.model');

class Container {
  constructor(filePath) {
    this.filePath = filePath;
    this.#readFile();
  }

  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.filePath, 'utf-8');
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const fileContent = await this.#readFile();

      const product = fileContent.find((product) => product.id === parseInt(id));
      if (product === undefined) return { error: 'product not found' };
      else return product;
    } catch (error) {
      throw new Error(error, 'Error to get the product by id');
    }
  }

  async save(obj) {
    try {
      const fileContent = await this.#readFile();
      const newProduct = new ProductModel(obj.name, obj.description, obj.code, obj.thumbnail, obj.price, obj.stock);
      if (fileContent.length !== 0) await fs.promises.writeFile(this.filePath, JSON.stringify([...fileContent, {...newProduct, id: fileContent[fileContent.length - 1].id + 1}], null, 2 ), 'utf-8');
      else await fs.promises.writeFile(this.filePath, JSON.stringify([{ ...newProduct, id: 1 }]), 'utf-8');
      return { Message: 'Product saved successfully' };
    } catch (error) {
      throw new Error(error, 'Error to save the product');
    }
  }

  async getAll() {
    try {
      const fileContent = await this.#readFile();

      if (fileContent.length === 0) return { Message: `There are no products.` };
      else return fileContent;
    } catch (error) {
      throw new Error(error, 'Error to get all products');
    }
  }

  async deleteById(id) {
    try {
      const fileContent = await this.#readFile();
      const productId = fileContent.findIndex((product) => product.id === parseInt(id))
      if (productId === -1) return { error: 'product not found' };
      fileContent.splice(productId, 1)
      await fs.promises.writeFile(this.filePath, JSON.stringify(fileContent, null, 2))
      return { Message: `Product with id ${id} deleted` };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.filePath, JSON.stringify([]), 'utf-8');
  }

  async updateProduct(id, newProduct) {
    const fileContent = await this.#readFile();
    
    try {
      const { name, description, code, thumbnail, price, stock } = newProduct;
      const item = fileContent.find((product) => product.id === parseInt(id));

      if (item) {
        item.name = name;
        item.description = description;
        item.code = code;
        item.thumbnail = thumbnail;
        item.price = price;
        item.stock = stock;
        
        await fs.promises.writeFile(this.filePath, JSON.stringify(fileContent, null, 2));
        return item;
      } else return { error: 'product not found' };
    } catch (error) {
      console.log(error);
    }
  }
}
    
module.exports = Container;