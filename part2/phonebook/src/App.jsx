import { useState,useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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

const Persons = ({searchValue, persons, removePerson}) => {
  return(
    <>{
      persons.filter(
        person =>person.name.toLowerCase().includes(searchValue)
      ).map(
          person => {
            return(
              <div key={person.id}>
                {person.name} {person.number} 
                <button onClick={()=>{
                  removePerson(person)
                }}>
                  delete
                </button>
              </div>
            )}
      )
    }</>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    personService
      .getAll()
      .then(data =>{
        setPersons(data)
      })
  }
  ,[])
  const  [newName, setNewName] = useState('')
  const  [newNumber, setNewNumber] = useState('')
  const  [searchValue, setSearchValue] = useState('')
  const  [notificationMessage, setNotificationMessage] = useState(null)

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
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const [oldPerson] = persons.filter(person => person.name === newName)
        personService
          .update(oldPerson.id, {...oldPerson, number: newNumber})
          .then(data =>{
          setPersons(persons.map(person => person.id === oldPerson.id ?{...person,number: newNumber} :person))
          setNotificationMessage(`Changed ${newName}'s Number`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
          setNewName('')
          setNewNumber('')
          console.log(persons)
        })
      }
    }else{
      personService
        .create({name:newName,number:newNumber})
        .then(data =>{
          setPersons(persons.concat(data))
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
          setNewName('')
          setNewNumber('')
          console.log(persons)
        })
    }
    // setPersons(persons.concat({name:newName,number:newNumber}))
  }

  const removePerson = (person) => {
    if(confirm(`Delete ${person.name} ?`)){
      personService
      .remove(person.id)
      .then( () =>{
        setPersons(persons.filter(filteredPerson => filteredPerson.id !== person.id))
        console.log(persons)
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>

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

      <Persons searchValue ={searchValue} persons ={persons} removePerson={removePerson} />
    </div>
  )
}

export default App