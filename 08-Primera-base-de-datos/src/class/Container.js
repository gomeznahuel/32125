const knexLib = require("knex");

class Container {
  constructor(options, tableName) {
    (this.knex = knexLib(options)), (this.tableName = tableName);
  }
  
  async listAll() {
    try {
      const getAll = await this.knex.from(this.tableName).select('*');
      return getAll;
    } catch (error) {
      console.error(error);
    }
  }

  async save(obj) {
    try {
      const save = await this.knex(this.tableName).insert(obj);
      return save;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Container;