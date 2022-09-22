class Products {
  constructor() {
    this.items = [];
  }

  get getProducts() {
    if (this.items.length === 0) return { Message: 'There are no products in the database.' };
    return this.items;
  }

  add(product) {
    try {
      const newItem = { id: this.items.length ? this.items[this.items.length - 1].id + 1 : 1, ...product };
      this.items.push(newItem);
      return newItem;
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductByID(id) {
    this.getProducts;
    const item = this.items.find((product) => product.id === Number(id)) || { error: 'Product not found.' };
    return item;
  }

  delete(id) {
    this.getProducts;
    const item = this.items.find((product) => product.id === Number(id)) || { error: 'Product not found.' };
    this.items = this.items.filter((item) => item.id !== Number(id));
    return item;
  }

  update(product, id) {
    this.getProducts;
    try {
      const { title, price, thumbnail } = product;
      const item = this.items.find((prod) => prod.id === Number(id));
      if (item) {
        item.title = title;
        item.price = price;
        item.thumbnail = thumbnail;
        return item;
      } else {
        return { error: 'Product not found' };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new Products();