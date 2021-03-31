import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setPuzzles } from '../../store/puzzles.js';
import { fetchGame } from '../../store/game';
import Home from './Home';
import Home5 from './Home5';
import Home3 from './Home3';
import Home2 from './Home2';
import Home4 from './Home4';
import Home1 from './Home1';

const LetterBank = (props) => {
  const [routeLocation, setRouteLocation] = useState({
    isHome: true,
    isHome1: false,
    isHome2: false,
    isHome3: false,
    isHome4: false,
    isHome5: false,
  });

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
    props.getGame(props.gameId);
  }, []);

  console.log('letterBank=>', props);

  return (
    <div>
      <div className="bankContainer">
        <div>
          <h1 className="bankHeadings">House of Riddles</h1>
        </div>
        <div className="bankRow">
          <div className="bankDivs">
            <h3 className="bankHeadings">Directions </h3>
            <p className="bankParagraphs">
              Solve all the puzzles in each room of the house.
              <br />
              <br />
              When a puzzle is solved, a clue will be revealed in the Room's
              Bank.
              <br />
              <br />
              Complete all the puzzles in every room to solve the last riddle in
              the Main Room to
              <br />
              <br />
              escape the House of Riddlez.
            </p>
          </div>
          {/* <p className="bankParagraphs">{Room.name} =  {Room.isSolved ? Solved : ""} </p> */}
          <div className="bankDivs">
            <h3 className="bankHeadings">Clues Bank</h3>
            <p className="bankParagraphs">Main Room (COMP HOME) = {} </p>
            <p className="bankParagraphs">Living Room (COMP HOME5)= </p>
            <p className="bankParagraphs">Attic (COMP HOME1) =</p>
            <p className="bankParagraphs">Upstairs Bedroom (COMP HOME2) =</p>
            <p className="bankParagraphs">Downstairs Bedroom (COMP HOME4) =</p>
            <p className="bankParagraphs">Backroom (COMP HOME3) =</p>
          </div>
        </div>
        <div className="returnHomeButtonDiv">
          {routeLocation.isHome ? (
            ''
          ) : (
            <button
              className="returnHomeButton"
              onClick={() => {
                setRouteLocation({
                  ...routeLocation,
                  isHome: true,
                  isHome1: false,
                  isHome3: false,
                  isHome5: false,
                  isHome4: false,
                  isHome2: false,
                });
              }}
            >
              Back to Main Room
            </button>
          )}
        </div>
      </div>

      {routeLocation.isHome ? (
        <Home
          routeLocation={routeLocation}
          setRouteLocation={setRouteLocation}
        />
      ) : routeLocation.isHome1 ? (
        <Home1 {...props} />
      ) : routeLocation.isHome4 ? (
        <Home4 {...props} />
      ) : routeLocation.isHome2 ? (
        <Home2 {...props} />
      ) : routeLocation.isHome5 ? (
        <Home5 {...props} />
      ) : routeLocation.isHome3 ? (
        <Home3 {...props} />
      ) : null}
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

export default connect(mapState, mapDispatch)(LetterBank);
