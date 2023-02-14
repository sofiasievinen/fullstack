import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  console.log('object', newObject)
  
  const config = {
    headers: { Authorization: token },
  }
  console.log('auth', token)
  console.log('config', config)
  
  
  const response = await axios.post(baseUrl, newObject, config)
  console.log('res',response.data)
  
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(`${baseUrl}/${id}`, newObject, config)
  console.log('res',response.data)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update }