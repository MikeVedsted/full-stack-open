const Form = ({ handleSubmit, setNewName, newName, setNewNumber, newNumber }) => <form onSubmit={handleSubmit} ><label>Name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)} /></label><br /><label>Number: <input type='text' value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></label><div><button type="submit">Add to phonebook</button></div></form>

export default Form
