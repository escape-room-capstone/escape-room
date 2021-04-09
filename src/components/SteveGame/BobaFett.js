import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../../public/CSS/BobaFett.css';
import LeverPuzzle from './LeverPuzzle';
import MagicSquarePuzzle from './MagicSquarePuzzle';
import AnnoyingPuzzle from './AnnoyingPuzzle';
import CaesarCipher from './CaesarCipher';

export const annoyingStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#444',
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
    padding: '20px',
  },
};

export default function BobaFett() {
  const [leverModalOpen, setLeverModalOpen] = useState(false);
  const [caesarCipherModalOpen, setCaesarCipherModalOpen] = useState(false);
  const [annoyingModalOpen, setAnnoyingModalOpen] = useState(false);
  const [magicSquareModalOpen, setMagicSquareModalOpen] = useState(false);
  const [leverPuzzleCompleted, setLeverPuzzleCompleted] = useState(false);
  const [magicSquarePuzzleCompleted, setMagicSquarePuzzleCompleted] = useState(
    false
  );
  const [annoyingPuzzleCompleted, setAnnoyingPuzzleCompleted] = useState(false);
  const [caesarCipherCompleted, setCaesarCipherCompleted] = useState(false);

  return (
    <div className='boba-container'>
      <div className='boba-background'>
        <button className='boba-lever-button' onClick={() => setLeverModalOpen(true)}></button>
        <Modal isOpen={leverModalOpen} overlayClassName="OverlayHome1" className="modal">
          <button onClick={() => setLeverModalOpen(false)}>Close Puzzle</button>
          <p className="status" style={{ color: "white" }}>Are these... holocrons? How did he... nevermind. The Jedi replaced your ship controls with locked holocrons. Open them all to regain system access.</p>
          <LeverPuzzle setLeverPuzzleCompleted={setLeverPuzzleCompleted}/>
        </Modal>
        <button className='boba-annoying-button' onClick={() => setAnnoyingModalOpen(true)}></button>
        <Modal isOpen={annoyingModalOpen} overlayClassName="OverlayHome4" className="modal">
          <button onClick={() => setAnnoyingModalOpen(false)}>Close Puzzle</button>
          <p className="status" style={{ fontSize: '40px', color: 'white' }}>This Jedi is crafty. Determine the fourth sequence to deactivate this portion of the self-destruct protocol.</p>
          <AnnoyingPuzzle setAnnoyingPuzzleCompleted={setAnnoyingPuzzleCompleted} setAnnoyingModalOpen={setAnnoyingModalOpen}/>
        </Modal>
        <button className='boba-magic-square-button' onClick={() => setMagicSquareModalOpen(true)}></button>
        <Modal isOpen={magicSquareModalOpen} overlayClassName="OverlayHome3" className="modal">
          <button onClick={() => setMagicSquareModalOpen(false)}>Close Puzzle</button>
          <p className="status">Now to make sure that the fuel system is working properly...</p>
          <MagicSquarePuzzle setMagicSquarePuzzleCompleted={setMagicSquarePuzzleCompleted}/>
        </Modal>
        <button className='boba-caesar-button' onClick={() => setCaesarCipherModalOpen(true)}></button>
        <Modal isOpen={caesarCipherModalOpen} overlayClassName="OverlayHome2" className="modal">
          <button onClick={() => setCaesarCipherModalOpen(false)}>Close Puzzle</button>
          <p className="status">Ugh. The Jedi encrypted the password to regain shield system access. Get thinking, FAST.</p>
          <CaesarCipher setCaesarCipherCompleted={setCaesarCipherCompleted}/>
        </Modal>
      </div>
    </div>
  );
}
