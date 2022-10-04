const express = require('express');
const CORS = require('cors');
const { createServer } = require('http');
const { Server: IOServer } = require('socket.io');
const hbsRoutes = require('../routes/socket.router');
const path = require('path');
const handlebars = require('express-handlebars');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = new IOServer(this.server, {});
    this.products = [];
    this.messages = [];
    this.hbsRoutes = '/';
  }

  middlewares() {
    // CORS: Enable CORS.
    this.app.use(CORS());

    // Read and parse body
    this.app.use(express.json());

    // Allows the server to understand the data that comes in JSON format and convert it to a JavaScript object.
    this.app.use(express.urlencoded({ extended: true }));

    // Public folder
    this.app.use(express.static('public'));

    // EJS engine
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(__dirname, '../views'));

    // Handlebars engine
    this.app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: path.join(this.app.get('views'), 'layouts'),
        partialsDir: path.join(this.app.get('views'), 'partials'),
      })
    );
  }

  configSockets() {
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.emit('products', this.products);
      socket.emit('messages', this.messages);

      socket.on('product', (title, price, thumbnail) => {
        this.products.push({ title: title, price: price, thumbnail: thumbnail });
        this.io.sockets.emit('products', this.products);
      });

      socket.on('new-message', (data) => {
        this.messages.push(data);
        this.io.sockets.emit('messages', this.messages);
      });
    });
  }

  routes() {
    this.app.use(this.hbsRoutes, hbsRoutes);
  }

  execute() {
    // Initialize Middlewares
    this.middlewares();

    // Initialize Sockets
    this.configSockets();

    // Initialize Routes
    this.routes();

    // Initialize Server
    this.server.listen(this.port, () => console.log(`Server running on port ${this.port}`)
    );
  }
}

module.exports = Server;
