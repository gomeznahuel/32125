require("dotenv").config();
const Server = require("./src/models/server");

const server = new Server();
server.listen();