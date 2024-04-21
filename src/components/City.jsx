import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/city.css'

const City = ({ copSelections, updateCopSelections }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('https://cop-fugitive-backend.onrender.com/cities')
      .then(response => response.json())
      .then(data => setCities(data));
  }, []);

  const isUniqueCity = (cityName) => {
    let currCity = true;
    copSelections.forEach(element => {
        if(element.city === cityName){
            currCity = false;
        }
    });
    return currCity;
  }

  const handleCityChange = (copIndex, cityName) => {
    console.log(copSelections);
    console.log(cityName);
    console.log(isUniqueCity(cityName));
    if(isUniqueCity(cityName)){
        updateCopSelections(copIndex, { city: cityName });
    }else{
        alert('City name must be unique');
    }
  };

  return (
    <div id='city-selection'>
      <h1 className='city-selection-title'>City Selection</h1>
      <p className='city-selection-description'>Select a city for each cop to investigate:</p>
      {copSelections.map((cop, index) => (
        <div key={index} className='city-cop-section'>
          <h2 className='city-cop-heading'>{cop.name}</h2>
          <select
          className='city-dropdown'
            value={cop.city || ''}
            onChange={(e) => handleCityChange(index, e.target.value)}
          >
            <option value="" disabled>Select a city</option>
            {cities.map((city) => (
              <option className='city-option' key={city.name} value={city.name}>
                {city.name} - {city.distance} KM
              </option>
            ))}
          </select>
        </div>
      ))}
      <Link to="/vehicle-selection">
        <button className='city-next-button'>Next</button>
      </Link>
    </div>
  );
};

export default City;
