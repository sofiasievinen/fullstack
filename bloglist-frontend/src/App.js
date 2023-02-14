import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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
      setBlogs( blogs )
    )  
    //console.log(blogs[0])
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleSubmit = async (event) => {
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

    const LoginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            autoFocus="autoFocus"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            //autoFocus="autoFocus"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" onClick = {handleLogin}>login</button>
      </form>      
    )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification 
          message = {notificationMessage} 
          isError = {isError}
        />
        <LoginForm/>
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App