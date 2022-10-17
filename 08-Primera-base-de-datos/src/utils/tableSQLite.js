const { optionsSQLite } = require("../database/config/optionsSQLite");
const knex = require("knex")(optionsSQLite);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("author", 50).notNullable();
    table.timestamp("date").defaultTo(knex.fn.now());
    table.string("msg", 300);
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