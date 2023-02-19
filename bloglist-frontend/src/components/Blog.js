import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {

  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = async () => {
    await handleLike({ blog })
    console.log('handleclick done')
  }

  const handleRemoveClick = async () => {
    await handleRemove({ blog })
  }

  if (blog.user.name === user.name) {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setInfoVisible(true)}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={() => setInfoVisible(false)}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
            likes {blog.likes}
          <button onClick = {handleLikeClick}>like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          <button onClick = {handleRemoveClick}>remove</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(false)}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
          likes {blog.likes}
        <button onClick = {handleLikeClick}>like</button>
        <br></br>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog