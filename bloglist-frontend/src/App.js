import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState ('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(compare))
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const  compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    else return 0
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log('token',user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setError(false)
      setNotificationMessage(`successfully logged in as ${username}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
    catch (exception) {
      console.log('täällä ollaan')
      setNotificationMessage('wrong username or password')
      setError(true)
      console.log('errorin arvo', isError)
      console.log('message', notificationMessage)

      setTimeout(() => {
        setNotificationMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleSubmit = async ({ event }) => {
    event.preventDefault()
    console.log('trying to post')
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      console.log(blog)

      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setError(false)
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
        setError(false)
      }, 5000)
    }
    catch (exception) {
      setError(true)
      setNotificationMessage(`couldn't add blog`)
      setTimeout(() => {
        setNotificationMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken('')
    setError(false)
    setNotificationMessage(`successfully logged out`)
    setTimeout(() => {
      setNotificationMessage(null)
      setError(false)
    }, 5000)
  }

  const handleTitleChange = (event) => {
    console.log('title:', event.target.value)
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log('author:', event.target.value)
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log('url:', event.target.value)
    setUrl(event.target.value)
  }

  const handleLike = async ({ blog }) => {
    console.log('liked')
    try {
      console.log('liked blog is',blog)
      const likes = blog.likes + 1
      const changedBlog = { ...blog, likes: likes }
      await blogService.update(blog.id, changedBlog)
    }
    catch (exception) {
      setError(true)
      setNotificationMessage(`couldn't like blog`)
      setTimeout(() => {
        setNotificationMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleRemove = async ({ blog }) => {
    console.log('remove', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(x => x.id !== blog.id))
        setNotificationMessage(`${blog.title} by ${blog.author} successfully deleted`)
        setTimeout(() => {
          setNotificationMessage(null)
          setError(false)
        }, 5000)
      }
      catch (exception) {
        setError(true)
        setNotificationMessage(`couldn't remove blog`)
        setTimeout(() => {
          setNotificationMessage(null)
          setError(false)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message = {notificationMessage}
          isError = {isError}
        />
        <LoginForm
          handleLogin = {handleLogin}
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message = {notificationMessage}
        isError = {isError}
      />
      <p>{user.name} logged in</p>
      <button onClick = {handleLogOut} >logout</button>
      <br></br>
      <br></br>
      <Togglable buttonLabel='new blog'>
        <BlogForm
          handleSubmit = {handleSubmit}
          title = {title}
          handleTitleChange = {handleTitleChange}
          author = {author}
          handleAuthorChange = {handleAuthorChange}
          url = {url}
          handleUrlChange = {handleUrlChange}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          handleLike = {handleLike}
          handleRemove = {handleRemove}
          user = {user}/>
      )}
    </div>
  )
}

export default App