require('dotenv').config()
module.exports = {
  app: {
    port: Number(process.env.PORT)
  },
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
  }
}