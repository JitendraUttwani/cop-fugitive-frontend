import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/vehicle.css'

const VehicleSelection = ({ copSelections, updateCopSelections }) => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vehicle data from the backend
    fetch('https://cop-fugitive-backend.onrender.com/vehicles')
      .then((response) => response.json())
      .then((data) => setVehicles(data));
  }, []);

  const handleVehicleChange = (copIndex, vehicleKind) => {
    updateCopSelections(copIndex, { vehicle: vehicleKind });
  };

  const validateVehicle = (cityDistance, vehicleRange) => {
    return vehicleRange >= cityDistance * 2;
  };

  const cityDistances = {
    Yapkashnagar: 60,
    Lihaspur: 50,
    'Narmis City': 40,
    Shekharvati: 30,
    Nuravgram: 20,
  };

  const validateAllVehicles = () => {
    return copSelections.every((cop) => {
      const city = cop.city;
      const vehicleKind = cop.vehicle;
      const vehicle = vehicles.find((v) => v.kind === vehicleKind);
      const cityDistance = cityDistances[city];
      return vehicle && validateVehicle(cityDistance, vehicle.range);
    });
  };

  const handleProceed = () => {
    if (validateAllVehicles()) {
      navigate('/result');
    } else {
      alert('Please select a vehicle with sufficient range for the chosen city.');
    }
  };

  return (
    <div id='vehicle-selection'>
      <h1 className='vehicle-selection-title'>Vehicle Selection</h1>
      {copSelections.map((cop, index) => (
        <div key={index} className='cop-section'>
          <h2 className='cop-heading'>{cop.name} - {cop.city}</h2>
          <select
            className='vehicle-select'
            value={cop.vehicle || ''}
            onChange={(e) => handleVehicleChange(index, e.target.value)}
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicles.map((vehicle) => (
              <option className='vehicle-option' key={vehicle.kind} value={vehicle.kind}>
                {vehicle.kind} - {vehicle.range} KM
              </option>
            ))}
          </select>
        </div>
      ))}
      <button className='vehicle-proceed-button' onClick={handleProceed}>Proceed to Results</button>
    </div>
  );
};

export default VehicleSelection;
