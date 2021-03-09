import React, { useState, useEffect } from 'react';
import '../../../public/CSS/nesRoom.css';
import Modal from 'react-modal';

const Attic = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <div className="background" id="attic"></div>
    </div>
  );
};

export default Attic;
