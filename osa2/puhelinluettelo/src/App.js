import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.flatMap((x) => [x.name]).includes(newName)) {
      console.log('ON JO!!!')
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log(newName, newNumber)
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    console.log(personsToShow)
  }

  const personsToShow = newSearch===''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter shown contacts</h3>
      <Filter
      handleFilterChange = {handleFilterChange}
      newSearch = {newSearch}
      />
      <h3>Add a new contact</h3>
      <PersonForm
      handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}
      newName = {newName}
      newNumber = {newNumber}
      addPerson = {addPerson}
      />
      <h3>Numbers</h3>
      <Persons
      personsToShow = {personsToShow}
      />
    </div>
  )

}

export default App