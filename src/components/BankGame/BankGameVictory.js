import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../../../public/CSS/Bank.css';

const BankGameVictory = (props) => {
  const [showModal, setShowModal] = useState(true);

  const customStyles = {
    content: {
      position: "fixed",
      width: "500px",
      height: "150px",      
      left: "calc(50% - 250px)"
    }
  };

  useEffect(()=>{
    
      setTimeout(() => {
        setShowModal(false);
      }, 6000);
      
  })

  return (
    <div className="bankVictory">
      <Modal style={customStyles} isOpen={showModal}>
        <h1> VICTORY ! ! ! </h1>
        <h2> Your final challenge is to find the home button </h2> 
        <button onClick={() => setShowModal(false)}> Close </button>               
      </Modal>

      <button className="homeButton" onClick={() => props.history.push('/')}>Home</button>
    </div>
  );
};

export default BankGameVictory;
