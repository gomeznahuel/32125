const { optionsMySQL } = require("../database/config/optionsMySQL");
const knex = require("knex")(optionsMySQL);

knex.schema
  .createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name", 30).notNullable();
    table.float("price");
    table.string("thumbnail", 200);
  })
  .then(() => {
    console.log("Tabla creada!");
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })

  .finally(() => {
    knex.destroy();
  });