const Country = ({ country, weather }) => {
  const { name, capital, population, languages, flag } = country
  const { temperature, weather_icons, wind_speed, wind_dir } = weather
  console.log(weather, country)
  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population {population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={flag} alt={`Flag of ${name}`} width='200px' />
      <h2>Weather in {capital}</h2>
      <p><strong>Temperature: </strong>{temperature}</p>
      <img src={weather_icons} alt={`weather in ${capital}`} />
      <p><strong>Wind: </strong>{wind_speed} mph {wind_dir}</p>

    </>
  )
}

export default Country
