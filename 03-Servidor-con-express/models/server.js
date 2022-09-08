const express = require("express");
const cors = require("cors");
const router = require("../routes/products.route");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.productsPath = '/';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Read and parse body
    this.app.use(express.json());

  }

  // Routes
  routes() {
    this.app.use(this.productsPath, router);
  }

  // Start server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;