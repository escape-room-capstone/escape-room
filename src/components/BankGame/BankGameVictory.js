import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../../public/CSS/Bank.css';

const BankGameVictory = (props) => {
  const [showModal, setShowModal] = useState(true);

  const customStyles = {
    content: {
      top: 'auto',
      bottom: 'auto',
      right: 'auto',
      left: 'auto',
      transform: 'translate(250%, 250%)',
    },
  };

  return (
    <div className="bankVictory">
      <Modal style={customStyles} isOpen={showModal}>
        <h1> VICTORY ! ! ! </h1>
        <button onClick={() => props.history.push('/home')}>Home</button>
        <button
          style={{ marginLeft: '10px' }}
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </Modal>

      <button onClick={() => props.history.push('/home')}>Home</button>
    </div>
  );
};

export default BankGameVictory;
