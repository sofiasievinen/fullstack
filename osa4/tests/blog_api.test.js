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

  const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

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

test('a valid blog can be added', async () => {
    const newBlog =     {
        title: "kolmas",
        author: "tyyppi 3",
        url: "www.lisaatesteja.fi",
        likes: 914
      }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length +1)
    expect(titles).toContain(
      'kolmas'
    )
  })

test('if no likes are given, likes is set to 0', async () => {
const newBlog = {
    title: "no likes",
    author: "hemmo 4",
    url: "www.testitesti.fi"
    }

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

const response = await api.get('/api/blogs')

const likes = response.body.map(r => r.likes)
expect(response.body).toHaveLength(initialBlogs.length +1)
expect(likes[2]).toEqual(0)
})

test('if no title is given, returns 400 bad request', async () => {
    const newBlog = {
        author: "hemmo 4",
        url: "www.testitesti.fi", 
        likes: 20
        }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('if no url is given, returns 400 bad request', async () => {
    const newBlog = {
        title: "testiblogi",
        author: "hemmo 4",
        likes: 20
        }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})
    
test('a blog can be deleted', async () => {
    const blogs = await blogsInDB()
    const toBeDeleted = blogs[0]
    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .expect(204)
  
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length -1)
  })

test('a blog can be updated', async () => {
const blogs = await blogsInDB()
const toBeUpdated = blogs[0]
const updatedBlog = {
    "title": "päivitetty blogi",
    "author": "testaaja 1",
    "url": "www.testi.fi",
    "likes": 1432
    }
    
await api
    .post(`/api/blogs/${toBeUpdated.id}`)
    .send(updatedBlog)
    .expect(200)

const response = await api.get('/api/blogs')

const titles = response.body.map(r => r.title)
expect(response.body).toHaveLength(initialBlogs.length)
expect(titles).toContain(
  'päivitetty blogi'
)
})

afterAll(async () => {
  await mongoose.connection.close()
})