import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setPuzzles } from '../../store/puzzles.js';
import { fetchGame } from '../../store/game';
import HouseOfRiddlez from './HouseOfRiddlez';
import LivingRoom from './LivingRoom';
import BackRoom from './BackRoom';
import RoomTwo from './RoomTwo';
import RoomOne from './RoomOne';
import Attic from './Attic';

const LetterBank = (props) => {
  const [routeLocation, setRouteLocation] = useState({
    isHome: true,
    isAttic: false,
    isRoomOne: false,
    isRoomTwo: false,
    isLivingRoom: false,
    isBackroom: false,
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
          {routeLocation.isHome ? (
            ''
          ) : (
            <button
              className="returnHomeButton"
              onClick={() => {
                setRouteLocation({
                  ...routeLocation,
                  isHome: true,
                  isAttic: false,
                  isBackroom: false,
                  isLivingRoom: false,
                  isRoomOne: false,
                  isRoomTwo: false,
                });
                // props.history.push('/HouseofRiddlez/2');
              }}
            >
              Back to Main Room
            </button>
          )}
        </div>
      </div>

      {routeLocation.isHome ? (
        <HouseOfRiddlez
          routeLocation={routeLocation}
          setRouteLocation={setRouteLocation}
        />
      ) : routeLocation.isAttic ? (
        <Attic {...props} />
      ) : routeLocation.isRoomOne ? (
        <RoomOne {...props} />
      ) : routeLocation.isRoomTwo ? (
        <RoomTwo {...props} />
      ) : routeLocation.isLivingRoom ? (
        <LivingRoom {...props} />
      ) : routeLocation.isBackroom ? (
        <BackRoom {...props} />
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
