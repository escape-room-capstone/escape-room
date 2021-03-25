import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setPuzzles } from '../../store/puzzles.js';
import { fetchGame } from '../../store/game';

const LetterBank = (props) => {
  const [location, setLocation] = useState(true);
  const [bank, setBank] = useState([
    {
      atticClues: {
        clue1: 'i am attic clue 1',
        clue2: 'i am attic clue2',
        clue3: 'I am attic clue 3',
      },
    },
    {
      roomTwoClues: {
        clue1: 'i am room2 clue 1',
        clue2: 'i am room2 clue2',
        clue3: 'I am room2 clue 3',
      },
    },
  ]);

  useEffect(() => {
    if (props.location.pathname === `/HouseofRiddlez/2`) {
      setLocation(true);
    }
    if (props.location.pathname !== `/HouseofRiddlez/2`) {
      setLocation(false);
    }
  });

  // useEffect(() => {
  //   props.getGame(props.gameId);
  // }, []);

  // useEffect(() => {
  //   if (props.history.location.pathname === `/HouseofRiddlez/${props.gameId}`) {
  //     setLocation(true);
  //   }
  //   if (props.history.location.pathname !== `/HouseofRiddlez/${props.gameId}`) {
  //     setLocation(false);
  //   }
  // });

  console.log('letterBank=>', props);

  return (
    <div className="bankContainer">
      <div>
        <h1 className="bankHeadings">House of Riddles</h1>
      </div>
      <div className="bankRow">
        <div className="bankDivs">
          <h3 className="bankHeadings">Directions </h3>
          <p className="bankParagraphs">
            Solve all the puzzles in each room of the house.
          </p>
          <br />
          <p className="bankParagraphs">
            When a puzzle is solved, a clue will be revealed in the Room's Bank.
          </p>
          <br />
          <p className="bankParagraphs">
            Complete all the puzzles in every room to solve the last riddle in
            the Main Room to
            <br />
            <br />
            escape the House of Riddlez.
          </p>
        </div>
        <div className="bankDivs">
          <h3 className="bankHeadings">Clues Bank</h3>
          <p className="bankParagraphs">Main Room = {} </p>
          <p className="bankParagraphs">Living Room = </p>
          <p className="bankParagraphs">Attic =</p>
          <p className="bankParagraphs">Upstairs Bedroom =</p>
          <p className="bankParagraphs">Downstairs Bedroom =</p>
        </div>
      </div>
      <div className="returnHomeButtonDiv">
        {location ? (
          ''
        ) : (
          <button
            className="returnHomeButton"
            onClick={() => {
              props.history.push('/HouseofRiddlez/2');
            }}
          >
            Back to Main Room
          </button>
        )}
      </div>
    </div>
  );
};

const mapState = (state, routeProps) => {
  const gameId = routeProps.match.params.gameId * 1;
  return { gameId };
};

const mapDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
  };
};

// const mapToState = (state) => {
//   return state;
// };

// const mapToDispatch = (dispatch) => {
//   return {
//     getGame: (gameId) => dispatch(fetchGame(gameId)),
//     getPuzzles: () => dispatch(setPuzzles()),
//   };
// };

export default connect(mapState, mapDispatch)(LetterBank);
//export default LetterBank;
