import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setCountriesToShow(countries
                        .filter(country => country.name.common.toLowerCase()
                        .startsWith(event.target.value)))
    console.log(countriesToShow)
  }

  return (
    <div>
      <Filter
      handleFilterChange = {handleFilterChange}
      newSearch = {newSearch}
      />
      <Countries
      countriesToShow = {countriesToShow}
      search = {newSearch}
      />
    </div>
  )
}

export default App;
