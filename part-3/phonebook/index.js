const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('request-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))
app.use(express.json())
app.use(cors())

let persons = [
  {
    "name": "Arto Hellas  ",
    "number": "111-1231231",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]


app.get('/', (request, response) => {
  response.redirect('/info')
})

app.get('/info', (request, response) => {
  const now = new Date(Date.now()).toString()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${now}</p > `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'Please provide a name and number.'
    })
  }

  if (persons.some(person => person.name === name)) {
    return response.status(409).json({ error: `${name} already exists in the phonebook.` })
  }

  const id = Math.floor(Math.random() * Math.pow(70, 9))
  const newPerson = { name, number, id }
  persons = persons.concat(newPerson)
  response.status(200).json(newPerson)
})
const PORT = 3001

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})