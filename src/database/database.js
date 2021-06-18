const { Pool } = require('pg');
const config = require('config')

class Database {
  constructor() {
    this.config = {
      user: config.get('database.user'),
      host: config.get('database.host'),
      database: config.get('database.database'),
      password: config.get('database.password'),
      port: config.get('database.port'),
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}

module.exports = new Database();