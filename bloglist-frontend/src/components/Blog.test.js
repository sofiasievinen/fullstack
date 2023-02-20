import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import App from '../App'

test('renders content', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'www.testi.fi',
    likes: 3,
    user: {
      username: 'Joku',
      name: 'tyyppi'
    },
  }

  const user = {
    username: 'Joku',
    name: 'tyyppi'
  }

  const element = render(<Blog blog={blog} handleLike = {App.handleLike} handleRemove = {App.handleRemove} user = {user}/>)

  expect(element.container).toHaveTextContent(
    'Testiblogi by Testaaja'
  )
})

test('clicking the view button shows all info', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'www.testi.fi',
    likes: 3,
    user: {
      username: 'Joku',
      name: 'tyyppi'
    },
  }

  const blogUser = {
    username: 'Joku',
    name: 'tyyppi'
  }

  const mockHandler = jest.fn()

  const element = render(<Blog blog={blog} handleLike = {App.handleLike} handleRemove = {App.handleRemove} user = {blogUser} setInfoVisible = {mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(element.container).toHaveTextContent(
    'likes 3'
  )
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'www.testi.fi',
    likes: 3,
    user: {
      username: 'Joku',
      name: 'tyyppi'
    },
  }

  const blogUser = {
    username: 'Joku',
    name: 'tyyppi'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike = {mockHandler} handleRemove = {App.handleRemove} user = {blogUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

