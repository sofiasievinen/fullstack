const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }
  else if (isError) {
    return (
      <div style = {errorStyle}>
        {message}
      </div>
    )
  }
  return (
    <div style = {notificationStyle}>
      {message}
    </div>
  )
}

export default Notification