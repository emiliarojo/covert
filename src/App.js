import React from 'react';
import './App.scss';
import Map from './components/Map';

export default function App() {
  return (
    <div className='page-container'>
      <div className='navbar'>
        <h1>COVERT</h1>
      </div>
      <Map />
    </div>
  );
}
