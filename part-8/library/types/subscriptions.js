const { gql } = require('apollo-server')

const subscriptions = gql`
  type Subscription {
    bookAdded: Book!
  }
`

module.exports = {
  subscriptions
};