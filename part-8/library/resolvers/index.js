const { queries } = require('./queries')
const { schemas } = require('./schemas')
const { mutations } = require('./mutations')
const { subscriptions } = require('./subscriptions')

const resolvers = [
  queries,
  schemas,
  mutations,
  subscriptions
]

module.exports = {
  resolvers
}