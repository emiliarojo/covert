import React, { useRef, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DistrictsData from "../data/districts.geojson";
import JardinesData from "../data/jardines.geojson";
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.154007);
  const [lat, setLat] = useState(41.390205);
  const [zoom, setZoom] = useState(11.25);
  let hoveredPolygonId = null;
  const colorArray = ["#9ACDB8", "#C7E7D8", "#7BBD9F", "#5F9F80", "#3D7E5D", "#2A634B"];


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
            'fill-color': {
              property: 'levelVegetation',
              stops: [[0.0, colorArray[0]], [1.0, colorArray[1]], [2.0, colorArray[2]], [3.0, colorArray[3]], [4.0, colorArray[4]], [5.0, colorArray[5]]]
              },
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
            'line-color': '#F9FAF6',
            'line-width': 2
          }
        });
      }

      map.current.on('click', 'district-fills', (e) => {
        const vegetationLevel = Math.floor(e.features[0].properties.levelVegetation);
        const leafIcons = Array.from({ length: vegetationLevel }, (_, index) => (
          <FontAwesomeIcon key={index} icon={faLeaf} />
        ));

        const leafIconsString = ReactDOMServer.renderToString(leafIcons);

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <h2>${e.features[0].properties.NOM}</h2>
            <h4>Vegetation Level  ${leafIconsString}</h4>
          `)
          .addTo(map.current);
      });




      fetch(JardinesData)
      .then(response => response.json())
      .then(data => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const lat = data[key].coordinates[0];
            const lng = data[key].coordinates[1];
            new mapboxgl.Marker({ color: 'black' }).setLngLat([lng, lat]).addTo(map.current);
            // marker.setPopup(new mapboxgl.Popup().setHTML(`<h3>${data[key].name}</h3>`));
        }};
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

  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div ref={mapContainer} className="map-container"></div>
  );
}
