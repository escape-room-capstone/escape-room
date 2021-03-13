import React, { useState } from "react";
import Modal from 'react-modal'
import '../../../public/CSS/BobaFett.css'
import LeverPuzzle from "./LeverPuzzle";

export default function BobaFett() {
  const [leverModalOpen, setLeverModalOpen] = useState(false);
  const [leverPuzzleCompleted, setLeverPuzzleCompleted] = useState(false);
  console.log(leverPuzzleCompleted)
  return (
    <div className='boba-container'>
      <div className='boba-background'>
        <button className='boba-lever-button' onClick={() => setLeverModalOpen(true)}></button>
        <Modal isOpen={leverModalOpen}>
          <button onClick={() => setLeverModalOpen(false)}>Close Puzzle</button>
          <LeverPuzzle setLeverPuzzleCompleted={setLeverPuzzleCompleted}/>
        </Modal>
      </div>
    </div>
  );
}