import React, { useState, useEffect } from 'react'

import Form from './components/Form'
import Search from './components/Search'
import People from './components/People'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('No users found')
  const [successMessage, setSuccessMessage] = useState(null)
  const [searchString, setSearchString] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  const checkIfExist = () => persons.some(a => a.name === newName)

  const addToPhoneBook = () => {
    personService
      .createPerson({ name: newName, number: newNumber })
      .then(res => {
        setPersons(persons.concat(res))
        setSuccessMessage(`${newName} successfully added to the phone book`)
      }).catch(error => {
        setErrorMessage(error.response.data.error)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (checkIfExist(newName)) {
      if (window.confirm(`${newName} already exists. Do you want to update the number?`)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        personService.updatePerson(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setSuccessMessage(`${returnedPerson.name} successfully updated!`)
          })
          .catch(() => {
            setErrorMessage(`Unable to find and update ${newName}`)
            setPersons(persons.filter(n => n.id !== person.id))
          })
      }
    } else {
      addToPhoneBook()
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}? (id: ${id})`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
      setSuccessMessage(`${name} successfully deleted`)
    }
  }

  useEffect(() => {
    personService
      .getAllPersons()
      .then(res => {
        setPersons(res)
        setErrorMessage(null)
        setSuccessMessage(null)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
      setSuccessMessage(null)
    }, 5000)
  }, [errorMessage, successMessage])



  return (
    <div>
      <h1>Phone book</h1>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      <Search searchString={searchString} setSearchString={setSearchString} />
      <h2>Add a new person and number</h2>
      <Form handleSubmit={handleSubmit} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h2>People in the phone book</h2>
      <People people={filteredPersons} handleDelete={handleDelete} />
    </div >
  )
}

export default App
