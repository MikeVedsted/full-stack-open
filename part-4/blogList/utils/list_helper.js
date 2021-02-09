const maxBy = require('lodash/maxBy')
const sumBy = require('lodash/sumBy')
const groupBy = require('lodash/groupBy')
const orderBy = require('lodash/orderBy')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const highestCount = Math.max(...blogs.map(blog => blog.likes))
  const indexToReturn = blogs.findIndex(blog => blog.likes === highestCount)
  return blogs[indexToReturn]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const { author, } = maxBy(blogs, (blog) => blog.author)
  const reducer = (sum, element) => element.author === author ? sum + 1 : sum
  const blogsByAuthor = blogs.reduce(reducer, 0)
  return { author: author, blogs: blogsByAuthor }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  const authorsGrouped = groupBy(blogs, (blog) => blog.author)
  for (const author in authorsGrouped) {
    if (Object.hasOwnProperty.call(authorsGrouped, author)) {
      const element = authorsGrouped[author]
      const sum = sumBy(element, (author) => author.likes)
      authorsGrouped[author].likes = sum
      authorsGrouped[author].author = author
    }
  }

  const orderedAuthors = orderBy(authorsGrouped, ['likes, author'], ['desc'])
  return { author: orderedAuthors[0].author, likes: orderedAuthors[0].likes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
