const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const config = require('./util/config')
const User = require('./models/user')

const { typeDefs } = require('./types')
const { resolvers } = require('./resolvers')

const MONGODB_URI = config.DB_STRING
const JWT_SECRET = config.JWT_SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`HTTP ready at ${url}`)
  console.log(`WS ready at ${subscriptionsUrl}`)
})
