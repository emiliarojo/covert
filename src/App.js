import logo from './logo.svg';
import './App.scss';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DistrictsData from "./data/districts.geojson";
import JardinesData from "./data/jardines.json"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { renderToString } from 'react-dom/server';
import ReactDOM from 'react-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGlhcm9qbyIsImEiOiJjbGFiM2xrMWMwYWl6M3BxcjZ6eGxqZzRjIn0.He81tZ6jjCziNZcwAKcpUA';
// Function to calculate color shade based on index
function getColorShade(index) {
  const shades = [
    '#BFDFCF', // Shade 0
    '#BFDFCF',
    '#BFDFCF',
    '#BFDFCF',
    '#BFDFCF',
    '#BFDFCF',
    '#BFDFCF',
    '#BFDFCF' // Shade 7
  ];

  switch (index) {
    case -1:
      return shades[0];
    case 0:
      return shades[0];
    case 1:
      return shades[1];
    case 2:
      return shades[2];
    case 3:
      return shades[3];
    case 4:
      return shades[4];
    case 5:
      return shades[5];
    case 6:
      return shades[6];
    default:
      return shades[7]; // For indices above 6
  }
}


export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.154007);
  const [lat, setLat] = useState(41.390205);
  const [zoom, setZoom] = useState(11.25);
  let hoveredPolygonId = null;

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

      // if (!map.current.getLayer('district-fills')) {
      //   map.current.addLayer({
      //     id: 'district-fills',
      //     type: 'fill',
      //     source: 'districts',
      //     layout: {},
      //     paint: {
      //       'fill-color': [
      //         'case',
      //         ['boolean', ['feature-state', 'hover'], false],
      //         '#BFDFCF', // Hovered state color
      //         ['interpolate', ['linear'], ['get', 'index'], 0, getColorShade(0), 6, getColorShade(6)],
      //       ],
      //       'fill-opacity': [
      //         'case',
      //         ['boolean', ['feature-state', 'hover'], false],
      //         1,
      //         0.5
      //       ]
      //     }
      //   });
      // }

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

      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.163218, 41.39228]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.155247, 41.363062]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.117901, 41.388439]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.177238, 41.441631]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.153461, 41.398686]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.199638, 41.408383]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.168368, 41.379518]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.186315, 41.434152]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.155247, 41.363062]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.117901, 41.388439]).addTo(map.current);
      new mapboxgl.Marker({ color: 'black' }).setLngLat([2.153461, 41.398686]).addTo(map.current);





      fetch('JardinesData')
      .then(response => response.json())
      .then(data => {
        data.Coordenadas.forEach((coord, index) => {
          const [lat, lng] = coord;
          const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
          marker.setPopup(new mapboxgl.Popup().setHTML(`<h3>${data.Nombre[index]}</h3><p>${data.Distrito[index]}</p>`));
        });
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
  });

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

    // map.current.on('click', 'district-fills', (e) => {
    //   const coordinates = e.lngLat;
    //   const url = '';
    //   fetch(url, {
    //     method: 'GET',
    //     headers: {'Content-Type':'application/json'}
    //   })
    //     .then(response => response.json()) // Parse the response as JSON
    //     .then((data) => {
    //       const popupHeader = data.solution; // Assuming the response contains the solution data
    //       const popupContent = (
    //         <div>
    //           <h3>{data.district}</h3>
    //           <p>{popupHeader}</p>
    //           <p>{data.description}</p>
    //         </div>
    //       );

    //       const html = renderToString(popupContent);
    //       const popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map.current);

    //       const closePopup = () => {
    //         popup.remove();
    //       };

    //       popup.on('close', () => {
    //         // Delay the removal of the popup to allow the 'close' event to finish
    //         setTimeout(closePopup, 0);
    //       });
    //     })
    //     .catch(error => {
    //       console.error('Error fetching JSON:', error);
    //     });


    //   const html = renderToString(popupContent);
    //   const popup = new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map.current);

    //   const closePopup = () => {
    //     popup.remove();
    //   };

    //   popup.on('close', () => {
    //     // Delay the removal of the popup to allow the 'close' event to finish
    //     setTimeout(closePopup, 0);
    //   });
    // });



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
