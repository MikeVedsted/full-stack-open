const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@full-stack-open.lvunx.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 3) {
  Person.find({}).then(people => {
    people.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 4 || process.argv.length === 5) {
  const person = new Person({
    name,
    number,
  })
  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length > 5) {
  console.log('Too many arguments. Please use the format: $ node mongo.js <password> <name> <number> and try again')
  process.exit(1)
}

