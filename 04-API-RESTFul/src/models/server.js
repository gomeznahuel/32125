const express = require('express');
const CORS = require('cors');
const productsRouter = require('../routes/products.route');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiProductsPath = '/api/products';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS: Enable CORS.
    this.app.use(CORS());

    // Allows the server to understand the data that comes in JSON format and convert it to a JavaScript object.
    this.app.use(express.urlencoded({extended:true}));

    // Read and parse body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  // Routes
  routes() {
    this.app.use(this.apiProductsPath, productsRouter);
  }

  // Start server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;