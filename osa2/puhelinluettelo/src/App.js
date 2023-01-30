import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.flatMap((x) => [x.name]).includes(newName)) {
      console.log('ON JO!!!')

      if (window.confirm (`${newName} is already added to the phonebook, replace the old number with a new one?`)) {        
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber}
  
        personService
        .update(changedPerson.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : response.data))
          setNotificationMessage(
            `${newName}'s contact information was updated`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError(true)
          setNotificationMessage(
            `Information of ${person.name} has already been deleted from the server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setError(false)
          }, 3000)
        })
      }

    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log(newName, newNumber)

      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(
          `${newName} was added to the phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setError(true)
        console.log(error.response.data)
        setNotificationMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
          setError(false)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (person) => {
    console.log(person)
    console.log('moi', person.id)
    if (window.confirm (`Delete ${person.name}?`)) {
      personService
      .remove(person.id)
      .then(returnedPerson => {
        setPersons(persons.filter(dude => dude.id !== person.id))
        console.log('setpersons')
        setNotificationMessage(
          `${person.name} was deleted from the phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
      .catch(error => {
        alert(
          `${person.name} is not in the server`
        )
      })
      console.log('delete')
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
      <Notification 
      message = {notificationMessage}
      isError = {isError}
      />
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
      deletePerson = {deletePerson}
      />
    </div>
  )

}

export default App