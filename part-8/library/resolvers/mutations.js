const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')

const config = require('../util/config')
const pubsub = new PubSub()
const Book = require('../models/book')
const User = require('../models/user')
const Author = require('../models/author')
const JWT_SECRET = config.JWT_SECRET

const mutations = {
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to do that")
      }

      if (args.title.length < 3) {
        throw new UserInputError('Title too short')
      }

      if (args.published < 1477) {
        throw new UserInputError(`Guthenberg didn't print until 1477. Please check your published date`)
      }

      if (args.published > new Date().getFullYear()) {
        throw new UserInputError(`Can't add books that aren't published yet.`)
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const bookObject = {
        title: args.title,
        author: author._id,
        published: Number(args.published),
        genres: [...args.genres]
      }

      const newBook = new Book(bookObject)

      try {
        await newBook.save()
        author.books = author.books.concat(newBook)
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to do that")
      }

      try {
        const authorToUpdate = await Author.findOne({ name: args.name })

        if (!authorToUpdate) {
          throw new UserInputError('Please provide a valid author name')
        }
        if (args.setBornTo > new Date().getFullYear()) {
          throw new UserInputError('Author must be born before they can be added.')
        }

        authorToUpdate.born = args.setBornTo
        authorToUpdate.save()
        return authorToUpdate
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },

    createUser: async (root, args) => {
      const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        await newUser.save()
        return newUser
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError("Invalid username and password combination")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }

  }
}

module.exports = {
  mutations
}