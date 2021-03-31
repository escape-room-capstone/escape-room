import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import ReactModal from 'react-modal';
import LetterBank from './LetterBank';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setPuzzles } from '../../store/puzzles.js';
import { fetchGame } from '../../store/game';

const Home2 = (props) => {
  const [puzzle1, setPuzzle1] = useState({
    riddle: '',
    solution: '',
    clue: '',
    letter: '',
    solved: false,
    showModal: false,
  });
  const [puzzle2, setPuzzle2] = useState({
    riddle: '',
    solution: '',
    clue: '',
    letter: '',
    solved: false,
    showModal: false,
  });
  const [puzzle3, setPuzzle3] = useState({
    riddle: '',
    solution: '',
    clue: '',
    letter: '',
    solved: false,
    showModal: false,
  });
  const [puzzle4, setPuzzle4] = useState({
    riddle: '',
    solution: '',
    clue: '',
    letter: '',
    solved: false,
    showModal: false,
  });
  const [bank, setBank] = useState([]);

  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <ReactModal
        overlayClassName="OverlayHome2"
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
        overlayClassName="OverlayHome2"
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
        overlayClassName="OverlayHome2"
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
      <div className="background" id="home2">
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

const mapToState = (state) => {
  return state;
};

const mapToDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
    getPuzzles: () => dispatch(setPuzzles()),
  };
};

export default connect(mapToState, mapToDispatch)(Home2);
//export default RoomTwo;
