const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => {
    return (
     <div>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit" onClick = {handleLogin}>login</button>
        </form>      
     </div>
    )
}
  

export default LoginForm