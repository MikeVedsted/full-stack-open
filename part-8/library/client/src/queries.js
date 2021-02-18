import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    published,
    genres,
    id,
    author {
      name
    }
  }
`

export const CURRENT_USER = gql`
 query {
  me {
    username
    favoriteGenre
  }
}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name, 
      bookCount,
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR_BORN = gql`
  mutation editAuthorBorn($name: String! $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_RECOMMENDATIONS = gql`
  query recommendations($genre: String!){
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`