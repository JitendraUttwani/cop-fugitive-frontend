import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css'

const LandingPage = () => {
  return (
    <div id='landing-page'>
      <h1 className='landing-page-title'>Cop and Fugitive Simulation</h1>
      <p className='landing-page-description'>Three fearless cops are on a mission to capture a notorious fugitive. Can they find him?</p>
      <Link to="/city-selection" className='link-style'>
        <button className='start-button'>Start</button>
      </Link>
    </div>
  );
};

export default LandingPage;
