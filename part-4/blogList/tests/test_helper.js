const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog post 1',
    author: 'Author 1',
    url: 'www.example.com/1',
    likes: 8
  },
  {
    title: 'Blog post 2',
    author: 'Author 2',
    url: 'www.example.com/2',
    likes: 16
  },
]

const initialUsers = [
  {
    username: 'Username1',
    name: 'User 1',
    password: '1111'
  },
  {
    username: 'Username2',
    name: 'User 2',
    password: '2222'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'toRemove', author: 'removeAuthor', url: 'www.remove.com', likes: 1 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}