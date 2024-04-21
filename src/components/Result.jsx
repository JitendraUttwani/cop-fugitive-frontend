import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/result.css'

const Result = ({ copSelections }) => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCapture = async () => {
      const response = await fetch('https://cop-fugitive-backend.onrender.com/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cops: copSelections }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error('Error fetching capture result');
      }
    };

    checkCapture(); // Check if any cop captured the fugitive when this component mounts
  }, [copSelections]);

  if (!result) {
    return <div>Loading...</div>;
  }

  const { success, capturingCop } = result;

  return (
    <div id='result-container'>
      <h1 className='result-title'>Capture Result</h1>
      {success ? (
        <p className='result-message'>
          The fugitive was successfully captured by {capturingCop}!
        </p>
      ) : (
        <p className='result-message'>Unfortunately, the fugitive escaped.</p>
      )}
      <button className='result-back-button' onClick={() => navigate('/')}>Back to Start</button>
    </div>
  );
};

export default Result;
