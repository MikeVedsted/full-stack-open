import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Form from './components/Form'
import Search from './components/Search'
import People from './components/People'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  const checkIfExist = () => persons.findIndex(a => a.name === newName)

  const addToPhonebook = () => setPersons(persons.concat({ name: newName, number: newNumber }))

  const handleSubmit = (event) => {
    event.preventDefault()
    checkIfExist(newName) >= 0 ? alert(`${newName} is already added to phonebook`) : addToPhonebook()
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))

  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchString={searchString} setSearchString={setSearchString} />
      <h2>Add a new person and number</h2>
      <Form handleSubmit={handleSubmit} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h2>People in the phonebook</h2>
      <People people={filteredPersons} />
    </div >
  )
}

export default App
