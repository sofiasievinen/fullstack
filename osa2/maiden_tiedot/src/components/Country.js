import { useState, useEffect } from 'react'
import axios from 'axios'
import Languages from './Languages'

const Country = ({country}) => {

   /* const [weatherData, setWeatherData] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    useEffect(() => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${api_key}`)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log("Response data", data);
          setWeatherData(data);
        })
      }, [])
      */

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <Languages languages = {country.languages}/>
            <br></br>
            <img src={country.flags.png} alt="flag"></img>
        </div>
    )
}

export default Country