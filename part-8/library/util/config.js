require('dotenv').config()

const DB_STRING = process.env.DB_STRING
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  DB_STRING,
  JWT_SECRET
}
