import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import ReactModal from 'react-modal';
import LetterBank from './LetterBank';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setPuzzles } from '../../reducers/puzzles.js';
import { fetchGame } from '../../reducers/game';

const Attic = (props) => {
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

  useEffect(() => {
    //get game related puzzles with hard coded gameId for now for testing purposes
    props.getGame(2);
  }, []);
  useEffect(() => {
    //get all puzzles ever made
    props.getPuzzles();
  }, []);

  console.log('atticProps=>', props);
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

      <div className="background" id="attic">
        <button onClick={() => setAtticPuzzle1({ showModal: true })}>
          Puzzle 1
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

export default connect(mapToState, mapToDispatch)(Attic);
//export default Attic;
