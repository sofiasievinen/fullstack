const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  /*Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
*/
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  if (body.title && body.url) {

    if (body.likes) {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
    else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
      })
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
  }
  else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter