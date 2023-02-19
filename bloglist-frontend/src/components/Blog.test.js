import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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