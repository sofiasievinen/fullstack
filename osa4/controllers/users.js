const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const userFound = await User.find({username: username})

  if (userFound.length === 0) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  }
  else {
    response.status(401).end()
  }
})

module.exports = usersRouter