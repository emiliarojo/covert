import logo from './logo.svg';
import './App.css';
// import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = accessToken;


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function RainBarrels() {
  <div class="solution-card">
    <h3 class="solution-header">
      Rain Barrels
    </h3>
    <p class="solution-paragrah">
      Install rain barrels or water tanks to capture and store rainwater from rooftops.
      These containers can be placed in outdoor spaces, such as gardens or balconies, and connected to downspouts to collect rainwater.
      The stored water can be used for watering plants, cleaning, or other non-potable purposes.
    </p>
  </div>
}

function GreenInfrastructure() {
  <div class="solution-card">
    <h3 class="solution-header">
      Green Infrastructure
    </h3>
    <p class="solution-paragrah">
      Barcelona can implement green infrastructure solutions, such as green roofs and permeable pavements.
      Green roofs are designed with vegetation and special drainage layers that capture rainwater and allow it to slowly release or be used by the plants.
      Permeable pavements, on the other hand, allow rainwater to seep through the surface into the ground, replenishing groundwater and reducing runoff.
      These measures can help reduce the burden on stormwater systems and increase groundwater recharge.
    </p>
  </div>
}

function PermeableSurfaces() {
  <div class="solution-card">
    <h3 class="solution-header">
      Permeable Surfaces
    </h3>
    <p class="solution-paragrah">
      Promote the use of permeable surfaces in urban areas.
      Permeable pavements, such as porous concrete or interlocking pavers, allow rainwater to infiltrate into the ground instead of creating runoff.
      This helps recharge groundwater and reduces the burden on stormwater drainage systems.
    </p>
  </div>
}

function EducationalCampaigns() {
  <div class="solution-card">
    <h3 class="solution-header">
    Educational Campaigns
    </h3>
    <p class="solution-paragrah">
      Raise awareness and educate the public about the importance of rainwater conservation.
      Organize workshops, seminars, or informational campaigns to teach residents about simple water-saving practices, such as using watering cans instead of hoses, timing irrigation to avoid water waste, or reducing water consumption in households.
      Empowering individuals with knowledge can lead to widespread adoption of water-saving behaviors.
    </p>
  </div>
}

export default App;
