const fs = require('fs');

class Container {
  constructor(filePath) {
    this.filePath = filePath;
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
      console.log(fileContent);
      await fs.promises.writeFile(this.filePath, JSON.stringify([...fileContent, {...obj, id: fileContent[fileContent.length - 1].id + 1}], null, 2 ), 'utf-8');
    } else { 
      await fs.promises.writeFile(this.filePath, JSON.stringify([{ ...obj, id: 1 }]), 'utf-8');
    }
  }

  async getById(id) {
    const fileContent = await this.#readFile();
    try {
      const objeto = fileContent.find((objeto) => objeto.id === id);
      console.log(objeto);
    } catch (error) {
      throw new Error(error, 'Error to get the product by id');
    }
  }

  async getAll() {
    const fileContent = await this.#readFile();
    console.log(fileContent);
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const deleted = content.filter((producto) => producto.id !== id);
      await fs.promises.writeFile(this.file, JSON.stringify(deleted, null, 4));
      console.log('Deleted');
    } catch (error) {
      console.log(`Error: no se pudo eliminar el producto con id ${id}.`);
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.filePath, JSON.stringify([]), 'utf-8');
  }
}
    

const contenedor = new Container('./productos.txt');
contenedor.save(
  {
    name: 'Green Tea',
    price: '2.50',
    thumbnail: 'https://www.example.com/images/green-tea.jpg',
    id: 1,
  },
  {
    name: 'Oolong Tea',
    price: '2.50',
    thumbnail: 'https://www.example.com/images/oolong-tea.jpg',
    id: 3,
  }
);
