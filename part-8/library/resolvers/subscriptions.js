const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

const subscriptions = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

module.exports = {
  subscriptions
}