const express = require('express');
const CORS = require('cors');
const { createServer } = require('http');
const { Server: IOServer } = require('socket.io');
const basicRouter = require('../routes/socket.router');
const path = require('path');
const Container = require('../class/Container');
const { optionsSQLite } = require('../database/config/optionsSQLite');
const { optionsMySQL } = require('../database/config/optionsMySQL');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = new IOServer(this.server);
    this.basicRouter = "/";
    this.products = new Container(optionsMySQL, "products");
    this.messages = new Container(optionsSQLite, "messages");
  }

  middlewares() {
    // CORS: Enable CORS.
    this.app.use(CORS());

    // Read and parse body
    this.app.use(express.json());

    // Allows the server to understand the data that comes in JSON format and convert it to a JavaScript object.
    this.app.use(express.urlencoded({ extended: true }));

    // Public folder
    this.app.use(express.static("public"));

    // EJS engine
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "../../public/views"));
  }

  configSockets() {
    this.io.on("connection", async (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.emit("products", await this.products.listAll());
      socket.on("newProduct", async (product) => {
        await this.products.save(product);

        this.io.emit("products", await this.products.listAll());
      });

      socket.emit("messages", await this.messages.listAll());

      socket.on("newMessage", async (msg) => {
        msg.date = new Date().toLocaleString();
        await this.messages.save(msg);

        this.io.emit("messages", await this.messages.listAll());
      });
    });
  }

  routes() {
    this.app.use(this.basicRouter, basicRouter);
  }

  execute() {
    // Initialize Middlewares
    this.middlewares();

    // Initialize Sockets
    this.configSockets();

    // Initialize Routes
    this.routes();

    // Initialize Server
    this.server.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

module.exports = Server;
