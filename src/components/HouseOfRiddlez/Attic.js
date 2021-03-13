import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import LetterBank from './LetterBank';

const Attic = () => {
  const [atticPuzzle1, setAtticPuzzle1] = useState({
    riddle: '',
    solution: '',
    solved: false,
    showModal: false,
  });

  const [atticClues, setAtticClues] = useState({
    clue1: 'I am attic puzzle clue 1',
    clue2: 'clue2',
    clue3: 'i am attic clue3',
  });

  const [count, setCount] = useState(0);

  // const modal = document.getElementById('modal-content');
  // window.onClick = function (event) {
  //   if (event.target !== modal) {
  //     modal.portalClassName.style.display = 'none';
  //   }
  // };

  return (
    <div className="container">
      <LetterBank atticClue1={atticClues.clue1} />
      <ReactModal
        overlayClassName="OverlayAttic"
        className="modal"
        isOpen={atticPuzzle1.showModal}
        onRequestClose={() => setAtticPuzzle1({ showModal: false })}
      >
        <div className="modal-content">
          <button
            className="close"
            onClick={() => setAtticPuzzle1({ showModal: false })}
          >
            x
          </button>
          PUZZLE ONE!!!!!!!!
        </div>
      </ReactModal>

      {/* <ReactModal
        overlayClassName="OverlayAttic"
        className="modal"
        isOpen={puzzle2.showModal}
        onRequestClose={() => setPuzzle2({ showModal: false })}
      >
        <div className="modal-content">
          ~~~~~THIS IS PUZZLLEEE TWO~~~~~~
          <button
            className="close"
            onClick={() => setPuzzle2({ showModal: false })}
          >
            x
          </button>
        </div>
      </ReactModal>
      <ReactModal
        overlayClassName="OverlayAttic"
        className="modal"
        isOpen={puzzle3.showModal}
        onRequestClose={() => setPuzzle3({ showModal: false })}
      >
        <div className="modal-content">
          ~~~~~THIS IS PUZZLLEEE THREEEE~~~~~~
          <button
            className="close"
            onClick={() => setPuzzle3({ showModal: false })}
          >
            x
          </button>
        </div>
      </ReactModal> */}

      <div className="background" id="attic">
        <button onClick={() => setAtticPuzzle1({ showModal: true })}>
          Puzzle 1
        </button>

        {/* <button onClick={() => setPuzzle2({ showModal: true })}>
          Puzzle 2
        </button>
        <button onClick={() => setPuzzle3({ showModal: true })}>
          Puzzle 3
        </button> */}
      </div>
    </div>
  );
};

export default Attic;
