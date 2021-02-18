const { gql } = require('apollo-server')

const mutations = gql`
  type Mutation {
    addBook(
      title: String!, 
      author: String!, 
      published: Int!, 
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

module.exports = {
  mutations
}