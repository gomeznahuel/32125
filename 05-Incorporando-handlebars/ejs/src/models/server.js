const express = require('express');
const CORS = require('cors');
const ejsRouter = require('../routes/ejs.route');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.ejsPath = '/';

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

    this.app.set('view engine', 'ejs');
    this.app.set('views', './src/views');

    // Views directory 
    // this.app.use(express.static('views'));
  }

  // Routes
  routes() {
    this.app.use(this.ejsPath, ejsRouter);
  }

  // Start server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    })
  }
}

module.exports = Server;