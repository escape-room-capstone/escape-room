import React, { useState, useEffect } from 'react';
import '../../../public/CSS/nesRoom.css';
import Modal from 'react-modal';

const BackRoom = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container">
      <div className="background" id="backroom"></div>
    </div>
  );
};

export default BackRoom;
