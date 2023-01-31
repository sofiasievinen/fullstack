const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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
let blogObject = new Blog(initialBlogs[0])
await blogObject.save()
blogObject = new Blog(initialBlogs[1])
await blogObject.save()
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

afterAll(async () => {
  await mongoose.connection.close()
})