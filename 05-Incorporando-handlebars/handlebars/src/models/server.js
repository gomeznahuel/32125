const express = require('express');
const CORS = require('cors');
const hbsRouter = require('../routes/hbs.route');
const hbs = require('express-handlebars');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.hbsPath = '/';

    // Middlewares
    this.middlewares();

    // Templates
    this.templates();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS: Enable CORS.
    this.app.use(CORS());

    // Allows the server to understand the data that comes in JSON format and convert it to a JavaScript object.
    this.app.use(express.urlencoded({ extended: true }));

    // Read and parse body
    this.app.use(express.json());

    // Handlebars
    this.app.set('view engine', 'hbs');
    this.app.set('views', './src/views');
  }

  // Templates engine (Handlebars)
  templates() {
    this.app.engine('hbs', hbs.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: './src/views/layouts',
        partialsDir: './src/views/partials',
      })
    );
  }

  // Routes
  routes() {
    this.app.use(this.hbsPath, hbsRouter);
  }

  // Start server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
