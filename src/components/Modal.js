import React from 'react';

const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <span onClick={onClose} className="btn-close">&times;</span>
      <h1>🌳 Sobre el Proyecto 🌳</h1>
      <p>Este proyecto busca abordar la sequía y la falta de vegetación en
        Barcelona mediante la implementación de jardines verticales, cubiertas
        verdes y otros elementos urbanos. Utilizando análisis de Data Science y
        datos históricos de lluvias y temperaturas, se ha evaluado el impacto
        del clima en la vegetación de la ciudad. Se ha identificado la distribución
        de los jardines verticales existentes y se ha creado una plataforma web
        interactiva que propone soluciones específicas para cada distrito, con
        el objetivo de mejorar el entorno verde y promover un mejor uso del agua.</p>
      <p>Pulse en los distintos distritos para conocer los niveles de vegetación presentes.
        Los marcadores negros en el mapa representan las ubicaciones de los jardines
        verticales existentes en la ciudad.</p>
      <p>Este proyecto fue finalista en el <strong>Barcelona Tech4Good Hackathon</strong>
        , organizado por Barcelona Activa y la Fundación Mobile World Capital,
        que tuvo lugar los días 20 y 21 de junio de 2023. Si deseas obtener más información
        sobre cómo se desarrolló la hackatón, puedes encontrar todos los detalles
        <a href="https://cibernarium.barcelonactiva.cat/-/hackato-tech4good" target="_blank" rel="noreferrer"> aquí</a>.</p>
      <div className="img-container">
        <img src="https://cibernarium.barcelonactiva.cat/cibernarium-theme/images/custom/logos/logo_ba.png" alt="Barcelona Activa Logo"/>
        <img src="https://event-assets.gsma.com/_AUTOxAUTO_crop_center-center_60_none/logomwc_2021-05-06-141422.png" alt="MWC Logo"/>
      </div>
    </div>
  );
};

export default Modal;
