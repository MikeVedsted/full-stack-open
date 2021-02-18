const Book = require('../models/book')
const Author = require('../models/author')

const queries = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      } else if (args.author) {
        return Book.find({ author: args.author })
      } else if (args.genre) {
        return Book.find({ genres: args.genre })
      }
    },

    allAuthors: async () => {
      let authors = await Author.find({})
      authors = authors.map((author) => {
        author.bookCount = author.books.length
        return author
      })
      return authors
    },

    me: (root, args, context) => context.currentUser
  }
}

module.exports = {
  queries
}