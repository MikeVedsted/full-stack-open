const { queries } = require('./queries')
const { schemas } = require('./schemas')
const { mutations } = require('./mutations')
const { subscriptions } = require('./subscriptions')


const typeDefs = [
  queries,
  schemas,
  mutations,
  subscriptions
]

module.exports = { typeDefs }