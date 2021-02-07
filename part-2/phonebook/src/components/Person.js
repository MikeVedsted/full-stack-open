const Person = ({ name, number, handleDelete }) => <p key={name}>{name} - {number} <button onClick={() => handleDelete()}>Delete</button></p>

export default Person
