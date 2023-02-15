const BlogForm = ({handleSubmit, title, handleTitleChange, 
                   author, handleAuthorChange, url, handleUrlChange}) => {

    const handleThis = async (event) => {
        await handleSubmit({event})
        console.log('handleclick done')
        }

    return ( 
        <div>
        <h2>create new</h2>
        <form onSubmit={handleThis}>
            <div>
            title:<input value={title}
            onChange={handleTitleChange}
            />
            </div>
            <div>
            author:<input
            value={author}
            onChange={handleAuthorChange}
            />
            </div>
            <div>
            url:<input
            value={url}
            onChange={handleUrlChange}
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