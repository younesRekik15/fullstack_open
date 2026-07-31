import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return(
    <div>
        filter shown with <input value = {value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value = {nameValue} onChange={nameOnChange}/>
      </div>
      <div>
        number: <input value = {numberValue} onChange={numberOnChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({searchValue, persons}) => {
  return(
    <>{
      persons.filter(
        person =>person.name.toLowerCase().includes(searchValue)
      ).map(
          person => <p key={person.id}>{person.name} {person.number}</p>
      )
    }</>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  }
  ,[])
  const  [newName, setNewName] = useState('')
  const  [newNumber, setNewNumber] = useState('')
  const  [searchValue, setSearchValue] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }
  
  const addNewPerson = (event) => {

    event.preventDefault()

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat({name:newName,number:newNumber}))
      setNewName('')
      setNewNumber('')
      console.log(persons)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchValue} onChange={handleSearchValueChange} />

      <h3>add a new</h3>

      <PersonForm 
        onSubmit={addNewPerson}
        nameValue={newName}
        numberValue={newNumber}
        nameOnChange={handleNewNameChange}
        numberOnChange={handleNewNumberChange}
      />

      <h3>Numbers</h3>

      <Persons searchValue ={searchValue} persons ={persons} />
    </div>
  )
}

export default App