const path = require("path");

const optionsSQLite = {
  client: "sqlite3",
  connection: { filename: path.resolve(__dirname, "../config/challenge.db3") },
  useNullAsDefault: true,
};

module.exports = { optionsSQLite };
