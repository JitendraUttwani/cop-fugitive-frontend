import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import City from './components/City';
import Vehicle from './components/Vehicle';
import Result from './components/Result';

function App() {
  const [copSelections, setCopSelections] = useState([
    { name: 'Cop 1', city: '', vehicle: '' },
    { name: 'Cop 2', city: '', vehicle: '' },
    { name: 'Cop 3', city: '', vehicle: '' },
  ]);

  const updateCopSelections = (copIndex, data) => {
    const newSelections = [...copSelections];
    newSelections[copIndex] = { ...newSelections[copIndex], ...data };
    setCopSelections(newSelections);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/city-selection"
          element={<City copSelections={copSelections} updateCopSelections={updateCopSelections} />}
        />
        <Route
          path="/vehicle-selection"
          element={<Vehicle copSelections={copSelections} updateCopSelections={updateCopSelections} />}
        />
        <Route
          path="/result"
          element={<Result copSelections={copSelections} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
