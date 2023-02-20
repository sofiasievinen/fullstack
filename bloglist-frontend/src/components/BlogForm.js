const BlogForm = ({ handleSubmit, title, handleTitleChange,
  author, handleAuthorChange, url, handleUrlChange }) => {

  const handleThis = async (event) => {
    await handleSubmit({ event })
    console.log('handleclick done')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleThis}>
        <div>
        title:<input value={title}
            onChange={handleTitleChange}
            placeholder='write title here'
            id = 'title'
          />
        </div>
        <div>
        author:<input
            value={author}
            onChange={handleAuthorChange}
            placeholder='write author here'
            id = 'author'
          />
        </div>
        <div>
        url:<input
            value={url}
            onChange={handleUrlChange}
            placeholder='write url here'
            id = 'url'
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm