const Author = require('../models/author')

const schemas = {
  Book: {
    author: async (root) => Author.findOne({ _id: root.author })
  }
}

module.exports = {
  schemas
}