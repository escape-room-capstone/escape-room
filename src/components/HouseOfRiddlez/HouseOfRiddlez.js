import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import { Link } from 'react-router-dom';
import LetterBank from './LetterBank';
import RoomTwo from './RoomTwo';
import Attic from './Attic';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setPuzzles } from '../../store/puzzles.js';
import { fetchGame } from '../../store/game';

const HouseOfRiddlez = (props) => {
  const [mainRoom, setMainRoom] = useState({
    mainRoomBank: 'CLUESSSSSS',
    atticClues: 'Im attic clues from main room',
    completed: false,
  });

  return (
    <div className="houseContainer">
      {/* <LetterBank mainRoomBank={mainRoom.mainRoomBank} /> */}

      <div className="background" id="home">
        <button
          className="secretButton"
          id="roomTwoButton"
          onClick={() => {
            props.history.push('/HouseofRiddlez/roomtwo');
          }}
        >
          {/* <Link to="/HouseofRiddlez/room2"></Link> */}
        </button>

        <button
          className="secretButton"
          id="atticButton"
          onClick={() => {
            props.history.push('/HouseofRiddlez/attic');
          }}
        >
          {/* <Link to="/HouseofRiddlez/attic"></Link> */}
        </button>

        <button
          className="secretButton"
          id="livingRoomButton"
          onClick={() => {
            props.history.push('/HouseofRiddlez/livingroom');
          }}
        >
          {/* <Link to="/HouseofRiddlez/livingroom"> </Link> */}
        </button>

        <button
          className="secretButton"
          id="roomOneButton"
          onClick={() => {
            props.history.push('/HouseofRiddlez/roomone');
          }}
        >
          {/* <Link to="/HouseofRiddlez/room1"> </Link> */}
        </button>

        <button
          className="secretButton"
          id="backRoomButton"
          onClick={() => {
            props.history.push('/HouseofRiddlez/backroom');
          }}
        >
          {/* <Link to="/HouseofRiddlez/backroom"></Link> */}
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

export default connect(mapToState, mapToDispatch)(HouseOfRiddlez);
//export default HouseOfRiddlez;
