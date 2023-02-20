import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm handleSubmit = {createBlog} title = {App.title} handleTitleChange = {App.handleTitleChange}
    author = {App.author} handleAuthorChange = {App.handleAuthorChange} url = {App.author} handleUrlChange = {App.handleUrlChange}/>)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'Testiblogi')
  await user.type(inputs[1], 'Testaaja')
  await user.type(inputs[2], 'www.testi.fi')

  fireEvent.submit(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].url).toBe('www.testi.fi')
})