import React, { useState } from "react";
import Modal from "react-modal";
import "../../../public/CSS/BobaFett.css";
import LeverPuzzle from "./LeverPuzzle";
import MagicSquarePuzzle from "./MagicSquarePuzzle";
import AnnoyingPuzzle from "./AnnoyingPuzzle";
import CaesarCipher from './CaesarCipher';

const annoyingStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#444'
    },
    content: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
}

export default function BobaFett() {
  const [leverModalOpen, setLeverModalOpen] = useState(false);
  const [caesarCipherModalOpen, setCaesarCipherModalOpen] = useState(false);
  const [annoyingModalOpen, setAnnoyingModalOpen] = useState(false);
  const [magicSquareModalOpen, setMagicSquareModalOpen] = useState(false);
  const [leverPuzzleCompleted, setLeverPuzzleCompleted] = useState(false);
  const [magicSquarePuzzleCompleted, setMagicSquarePuzzleCompleted] = useState(
    false
  );
  const [annoyingPuzzleCompleted, setAnnoyingPuzzleCompleted] = useState(
    false
  );
  const [caesarCipherCompleted, setCaesarCipherCompleted] = useState(
    false
  );

  return (
    <div className='boba-container'>
      <div className='boba-background'>
        <button className='boba-lever-button' onClick={() => setLeverModalOpen(true)}></button>
        <Modal isOpen={leverModalOpen}>
          <button onClick={() => setLeverModalOpen(false)}>Close Puzzle</button>
          <LeverPuzzle setLeverPuzzleCompleted={setLeverPuzzleCompleted}/>
        </Modal>
        <button className='boba-annoying-button' onClick={() => setAnnoyingModalOpen(true)}></button>
        <Modal isOpen={annoyingModalOpen} style={annoyingStyle}>
          <button onClick={() => setAnnoyingModalOpen(false)}>Close Puzzle</button>
          <p>This Jedi is crafty. Determine the fourth sequence to deactivate this portion of the self-destruct protocol.</p>
          <AnnoyingPuzzle setAnnoyingPuzzleCompleted={setAnnoyingPuzzleCompleted} setAnnoyingModalOpen={setAnnoyingModalOpen}/>
        </Modal>
        <button className='boba-magic-square-button' onClick={() => setMagicSquareModalOpen(true)}></button>
        <Modal isOpen={magicSquareModalOpen}>
          <button onClick={() => setMagicSquareModalOpen(false)}>Close Puzzle</button>
          <MagicSquarePuzzle setMagicSquarePuzzleCompleted={setMagicSquarePuzzleCompleted}/>
        </Modal>
        <button className='boba-caesar-button' onClick={() => setCaesarCipherModalOpen(true)}></button>
        <Modal isOpen={caesarCipherModalOpen}>
          <button onClick={() => setCaesarCipherModalOpen(false)}>Close Puzzle</button>
          <p>Ugh. The Jedi encrypted the password to regain system access. Get thinking, FAST.</p>
          <CaesarCipher setCaesarCipherCompleted={setCaesarCipherCompleted}/>
        </Modal>
      </div>
    </div>
  );
}