const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id).populate('user', { id: 1 })

  if (!user) {
    response.status(400).json({ error: 'User does not exist' })
  }

  if (user._id.toString() !== blog.user.id.toString()) {
    return response.status(401).json({ error: 'Not authorized to do that', user: user._id, blogUser: blog.user.id })
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})


blogsRouter.post('/', async (request, response) => {
  const { title, author, url } = request.body
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ title, author, url, likes: 0, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const updateObject = { ...request.body, user: decodedToken.id }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateObject, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
