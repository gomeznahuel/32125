const express = require("express");
const CORS = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.productsPath = '/api/products';
    this.cartPath = '/api/cart';
  }

  middlewares() {
    // CORS
    this.app.use(CORS());
    
    this.app.use(express.urlencoded({ extended: true }));
    
    // Read and parse body
    this.app.use(express.json());
  }

  // Routes
  routes() {
    this.app.use(this.productsPath, require('../routes/products.route'));
    this.app.use(this.cartPath, require('../routes/cart.route'));
  }

  execute() {
    // Initialize middlewares
    this.middlewares();

    // Initialize routes
    this.routes();

    // Start server
    this.app.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
  }
}

module.exports = Server;