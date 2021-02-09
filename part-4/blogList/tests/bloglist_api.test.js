const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('getters', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('the first blog is about Blog Post 1', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Blog post 1')
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'Blog post 2'
    )
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})

describe('posters', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Valid blog post',
      author: 'Valid author',
      url: 'www.validUrl.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain('Valid blog post')
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Valid author',
      url: 'www.validUrl.com',
      likes: 1
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without title and url returns status 400', async () => {
    const newBlog = {
      author: 'Valid author',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('saved blog has correct format', async () => {
    const newBlog = { title: 'Correctly saved blog', author: 'Mr. Correct', url: 'www.correctly-saved.com', likes: 99 }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.title).toBe('Correctly saved blog')
    expect(savedBlog.body.author).toBe('Mr. Correct')
    expect(savedBlog.body.url).toBe('www.correctly-saved.com')
    expect(savedBlog.body.likes).toBe(99)
    expect(savedBlog.body.id).toBeDefined()
  })
})


describe('deleters', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('putters', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const update = { title: 'Changed Title', author: 'Changed Author', url: 'www.changed.com', likes: blogToUpdate.likes + 500, }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body).toEqual({ title: 'Changed Title', author: 'Changed Author', url: 'www.changed.com', likes: blogToUpdate.likes + 500, id: blogToUpdate.id })
    expect(updatedBlog.body).not.toBe(blogToUpdate)
  })
})


describe('structure tests', () => {
  test('blogs should have id but not _id', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogs.body[0].id).toBeDefined
    expect(blogs.body[0]).not.toHaveProperty('_id')
  })
})


afterAll(() => {
  mongoose.connection.close()
})
