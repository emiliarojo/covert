import React, { useState, useEffect }  from 'react';
import './App.scss';
import Map from './components/Map';
import Modal from './components/Modal';
import ColorScale from './components/ColorScale';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isFirstTime = localStorage.getItem('isFirstTime');

    if (!isFirstTime) {
      setShowModal(true);
      localStorage.setItem('isFirstTime', 'true');
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='page-container'>
      {showModal && <Modal onClose={closeModal} />}
      <div className='navbar'>
        <h1>COVERT</h1>
      </div>
      <ColorScale />
      <Map />
    </div>
  );
}
