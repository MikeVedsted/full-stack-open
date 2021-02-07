import Person from './Person'

const People = ({ people, handleDelete }) => people.map(person => <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person.name, person.id)} />)

export default People
