import React, { useState } from "react";
import Modal from "react-modal";
import "../../../public/CSS/BobaFett.css";
import LeverPuzzle from "./LeverPuzzle";
import MagicSquarePuzzle from "./MagicSquarePuzzle";
import AnnoyingPuzzle from "./AnnoyingPuzzle";

export default function BobaFett() {
  const [leverModalOpen, setLeverModalOpen] = useState(false);
  const [annoyingModalOpen, setAnnoyingModalOpen] = useState(false);
  const [magicSquareModalOpen, setMagicSquareModalOpen] = useState(false);
  const [leverPuzzleCompleted, setLeverPuzzleCompleted] = useState(false);
  const [magicSquarePuzzleCompleted, setMagicSquarePuzzleCompleted] = useState(
    false
  );
  const [annoyingPuzzleCompleted, setAnnoyingPuzzleCompleted] = useState(
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
        <Modal isOpen={annoyingModalOpen}>
          <button onClick={() => setAnnoyingModalOpen(false)}>Close Puzzle</button>
          <p>Determine the final sequence. Incorrect answers will generate new numbers.</p>
          <AnnoyingPuzzle setAnnoyingPuzzleCompleted={setAnnoyingPuzzleCompleted} setAnnoyingModalOpen={setAnnoyingModalOpen}/>
        </Modal>
        <button className='boba-magic-square-button' onClick={() => setMagicSquareModalOpen(true)}></button>
        <Modal isOpen={magicSquareModalOpen}>
          <button onClick={() => setMagicSquareModalOpen(false)}>Close Puzzle</button>
          <MagicSquarePuzzle setMagicSquarePuzzleCompleted={setMagicSquarePuzzleCompleted}/>
        </Modal>
      </div>
    </div>
  );
}