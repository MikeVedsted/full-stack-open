import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Country from './components/Country'
import CountryList from './components/CountryList'
import './App.css';

function App() {
  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([...countries])
  const [weather, setWeather] = useState({})
  const countriesURL = 'https://restcountries.eu/rest/v2/all'
  const baseWeatherURL = 'http://api.weatherstack.com'
  const weatherApiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))
    setFilteredCountries(filteredCountries)
  }, [searchString, countries])

  useEffect(() => {

    axios.get(countriesURL)
      .then(res => {
        setCountries(res.data)
        setFilteredCountries(res.data)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios.get(`${baseWeatherURL}/current?access_key=${weatherApiKey}&query=${filteredCountries[0].capital}`)
        .then(res => setWeather(res.data.current))
    }
  }, [filteredCountries])


  return (
    <>
      <Search searchString={searchString} setSearchString={setSearchString} />
      <br />
      {filteredCountries.length === 1 ? <Country country={filteredCountries[0]} weather={weather} /> : <CountryList countries={filteredCountries} setFilteredCountries={setFilteredCountries} />}
    </>
  )
}

export default App;
