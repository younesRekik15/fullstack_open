import { useEffect, useState } from 'react'
import axios from 'axios'

const SearchBarForm = ({value, onChange}) => {
  return(
    <div>
      find countries <input value={value} onChange={onChange}/>
    </div>
  )
}

const DisplaySection = ({countries}) => {
  if(countries){
    if(countries.length>10){
      return(<p>Too many matches, specify another filter</p>)
    }else if(countries.length>1){
      return(
        <>
          {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
        </>
      )
    }else if(countries.length === 1){
      const country = countries[0]
      return(
        <>
          <h1>{country.name.common}</h1>
          <p>Capital {country.capital}</p>
          <p>Area {country.area}</p>
          <h1>Languages</h1>
          <ul>
            {Object.entries(country.languages).map((language) => <li key={language[0]}>{language[1]}</li>)}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt}/>
        </>
      )
    }
    
  }else{
    return(<></>)
  }
  
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [matchedCountries, setMatchedCountries] = useState(null)


  const handleSearchValueChange = (event) => {
    const changedValue = event.target.value
    setSearchValue(changedValue)
    setMatchedCountries(countries.filter(country => country.name.official.toLowerCase().includes(changedValue.toLowerCase())))
    

  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then( result => setCountries(result.data))
  }
  ,[])
  if(countries){
    if(matchedCountries){
      return (
        <>
          <SearchBarForm
            value={searchValue}
            onChange={handleSearchValueChange}
          />
          {searchValue === ''?'':<DisplaySection countries={matchedCountries}/>}
        </>
      )
    }else{
      return (
      <>
        <SearchBarForm
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      </>
    )
    }
    
  }else{
    return (
      <>
        <p>loading...</p>
      </>
    )
  }
  
}

export default App
