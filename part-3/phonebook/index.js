require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.get('/info', (request, response, next) => {
  const now = new Date(Date.now()).toString()
  Person.find({})
    .then(people => response.send(`<p>Phonebook has info for ${people.length} people</p > <p>${now}</p > `))
    .catch(error => next(error))

})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(people => response.json(people)).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (!name || !number) {
    return response.status(400).json({ error: 'Please provide a name and number.' }).end()
  }
  const person = new Person({ name, number })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const person = { name, number }

  Person.findByIdAndUpdate(request.params.id, person, { new: true }, { runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Invalid id format' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

