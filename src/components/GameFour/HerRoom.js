import React, { useState, useEffect } from 'react';
import '../../../public/CSS/nesRoom.css';
import Modal from 'react-modal';

const HerRoom = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <div className="background" id="herroom"></div>
    </div>
  );
};

export default HerRoom;
