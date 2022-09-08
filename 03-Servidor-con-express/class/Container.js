const fs = require('fs');

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

  async save(obj) {
    const fileContent = await this.#readFile();
    if (fileContent.length !== 0) {
      await fs.promises.writeFile(this.filePath, JSON.stringify([...fileContent, {...obj, id: fileContent[fileContent.length - 1].id + 1}], null, 2 ), 'utf-8');
    } else { 
      await fs.promises.writeFile(this.filePath, JSON.stringify([{ ...obj, id: 1 }]), 'utf-8');
    }
  }

  async getById(id) {
    try {
      const fileContent = await this.#readFile();
      const product = fileContent.find((objeto) => objeto.id === id);
      return product;
    } catch (error) {
      throw new Error(error, 'Error to get the product by id');
    }
  }

  async getAll() {
    try {
      const fileContent = await this.#readFile();
      return fileContent;
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
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.filePath, JSON.stringify([]), 'utf-8');
  }
}
    
module.exports = Container;