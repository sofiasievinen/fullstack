const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require ('../utils/list_helper')

const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "testiblogi",
        "author": "testaaja 1",
        "url": "www.testi.fi",
        "likes": 1432
      },
      {
        "title": "kokeilu",
        "author": "testaaja 2",
        "url": "www.kokeilu.fi",
        "likes": 36
      },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

test('id is not called _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined
})

afterAll(async () => {
  await mongoose.connection.close()
})