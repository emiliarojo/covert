import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DistrictsData from "../data/districts.geojson";
import SolutionsData from "../data/solutions.geojson";
import 'reactjs-popup/dist/index.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1pbGlhcm9qbyIsImEiOiJjbGo3aXRqejAwZ2wyM2RvYml5ZjY1Y3I5In0.YaPf0eyeVU7WKPERik5gTA';


export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(2.154007);
  const [lat, setLat] = useState(41.390205);
  const [zoom, setZoom] = useState(11.25);
  let hoveredPolygonId = null;
  const colorArray = ["#D8EFE2", "#EBF7F2", "#BFDFCF", "#99BBA9", "#6C9E88", "#4D7B65"];


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
            'line-color': '#BFDFCF',
            'line-width': 2
          }
        });
      }

      map.current.on('click', 'district-fills', (e) => {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.NOM)
        .addTo(map.current);
      });


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





    //   fetch(JardinesData)
    //   .then(response => response.json())
    //   .then(data => {
    //     data.Coordenadas.forEach((coord, index) => {
    //       const [lat, lng] = coord;
    //       const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    //       marker.setPopup(new mapboxgl.Popup().setHTML(`<h3>${data.Nombre[index]}</h3><p>${data.Distrito[index]}</p>`));
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error fetching JSON:', error);
    // });

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
    <div className='page-container'>
      <div className='navbar'>
        <h2>COVERT</h2>
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
}
