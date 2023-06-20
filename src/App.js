import logo from './logo.svg';
import './App.scss';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DistrictsData from "./data/districts.geojson";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { renderToString } from 'react-dom/server';
import ReactDOM from 'react-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGlhcm9qbyIsImEiOiJjbGFiM2xrMWMwYWl6M3BxcjZ6eGxqZzRjIn0.He81tZ6jjCziNZcwAKcpUA';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.154007);
  const [lat, setLat] = useState(41.390205);
  const [zoom, setZoom] = useState(11.25);
  let hoveredPolygonId = null;

  // const url = 'https://what-jx88.onrender.com/example'
  // fetch(url, {
  //   method: 'GET',
  //   headers: {'Content-Type':'application/json'}
  // })
  // .then(response => response.json())

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));

      if (!map.current.getSource('districts')) {
        map.current.addSource('districts', {
          type: 'geojson',
          data: DistrictsData,
        });
      }

      if (!map.current.getLayer('district-fills')) {
        map.current.addLayer({
          'id': 'district-fills',
          'type': 'fill',
          'source': 'districts',
          'layout': {},
          'paint': {
            'fill-color': '#BFDFCF',
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.5
            ]
          }
        });
      }

      if (!map.current.getLayer('district-borders')) {
        map.current.addLayer({
          id: 'district-borders',
          type: 'line',
          source: 'districts',
          layout: {},
          paint: {
            'line-color': '#BFDFCF',
            'line-width': 2
          }
        });
      }
    });

    map.current.on('mousemove', 'district-fills', (e) => {
      if (e.features.length > 0) {
        if (hoveredPolygonId !== null) {
          map.current.setFeatureState(
            { source: 'districts', id: hoveredPolygonId },
            { hover: false }
          );
        }
        hoveredPolygonId = e.features[0].id;
        map.current.setFeatureState(
          { source: 'districts', id: hoveredPolygonId },
          { hover: true }
        );
      }
    });

    map.current.on('mouseleave', 'district-fills', () => {
      if (hoveredPolygonId !== null) {
        map.current.setFeatureState(
          { source: 'districts', id: hoveredPolygonId },
          { hover: false }
        );
      }
      hoveredPolygonId = null;
    });

    map.current.on('click', 'district-fills', (e) => {
      const coordinates = e.lngLat;
      // const description = e.features[0].properties.description;

      const popupContent = (
        <div>
          <h3>Popup</h3>
          {/* <p>{description} </p> */}
          <p>Description</p>
        </div>
      );

      const html = renderToString(popupContent);
      const popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map.current);

      const closePopup = () => {
        popup.remove();
      };

      popup.on('close', () => {
        // Delay the removal of the popup to allow the 'close' event to finish
        setTimeout(closePopup, 0);
      });
    });



  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div className='page-container'>
      <div className='navbar'>
        <h2>COVERT</h2>
      </div>
      <div ref={mapContainer} className="map-container"></div>
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
