import React, { useState, useEffect } from 'react';
import '../../../public/CSS/Trapped.css';
import ReactModal from 'react-modal';

const RoomOne = (props) => {
  const [puzzle1, setPuzzle1] = useState({
    riddle: '',
    solution: '',
    clue: '',
    solved: false,
    showModal: false,
  });
  const [puzzle2, setPuzzle2] = useState({
    riddle: '',
    solution: '',
    clue: '',
    solved: false,
    showModal: false,
  });
  const [puzzle3, setPuzzle3] = useState({
    riddle: '',
    solution: '',
    clue: '',
    solved: false,
    showModal: false,
  });
  const [puzzle4, setPuzzle4] = useState({
    riddle: '',
    solution: '',
    clue: '',
    solved: false,
    showModal: false,
  });
  const [bank, setBank] = useState([]);

  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <ReactModal
        overlayClassName="OverlayRoomOne"
        className="modal"
        isOpen={puzzle1.showModal}
        onRequestClose={() => setPuzzle1({ showModal: false })}
      >
        <div className="modal-content">
          <button
            className="close"
            onClick={() => setPuzzle1({ showModal: false })}
          >
            x
          </button>
          PUZZLE ONE!!!!!!!!
        </div>
      </ReactModal>

      <ReactModal
        overlayClassName="OverlayRoomOne"
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
        overlayClassName="OverlayRoomOne"
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
      </ReactModal>

      <div className="background" id="roomOne">
        {' '}
        <button onClick={() => setPuzzle1({ showModal: true })}>
          Puzzle 1
        </button>
        <button onClick={() => setPuzzle2({ showModal: true })}>
          Puzzle 2
        </button>
        <button onClick={() => setPuzzle3({ showModal: true })}>
          Puzzle 3
        </button>
      </div>
    </div>
  );
};

export default RoomOne;
