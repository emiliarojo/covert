import React from 'react';
import './App.scss';
import Map from './components/Map';

export default function App() {
  return (
    <div className='page-container'>
      <div className='navbar'>
        <h2>COVERT</h2>
      </div>
      <Map />
    </div>
  );
}
