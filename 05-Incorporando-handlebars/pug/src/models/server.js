const express = require('express');
const CORS = require('cors');
const pugRouter = require('../routes/pug.route');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pugPath = '/';

    // Sets
    this.sets();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  sets() {
    // Pug
    this.app.set('view engine', 'pug');
    this.app.set('views', './src/views');
  }

  middlewares() {
    // CORS: Enable CORS.
    this.app.use(CORS());

    // Allows the server to understand the data that comes in JSON format and convert it to a JavaScript object.
    this.app.use(express.urlencoded({extended:true}));

    // Read and parse body
    this.app.use(express.json());
  }

  // Routes
  routes() {
    this.app.use(this.pugPath, pugRouter);
  }

  // Start server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    })
  }
}

module.exports = Server;