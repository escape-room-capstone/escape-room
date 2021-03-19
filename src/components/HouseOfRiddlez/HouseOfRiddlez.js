import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';
import { Link } from 'react-router-dom';
import LetterBank from './LetterBank';

const HouseOfRiddlez = () => {
  const [puzzle1, setPuzzle1] = useState({
    riddle: '',
    solution: '',
    clue: '',
    letter: '',
    solved: false,
    showModal: false,
  });

  const [mainRoom, setMainRoom] = useState({
    mainRoomBank: 'CLUESSSSSS',
    completed: false,
  });

  return (
    <div className="houseContainer">
      <LetterBank mainRoom={mainRoom.mainRoomBank} />

      <div className="background" id="home">
        <Link to="/room2">
          <button className="secretButton" id="roomTwoButton">
            room 2
          </button>
        </Link>
        <Link to="/houseofriddlez/attic">
          <button className="secretButton" id="atticButton">
            attic
          </button>
        </Link>
        <Link to="/livingroom">
          <button className="secretButton" id="livingRoomButton">
            living room
          </button>
        </Link>
        <Link to="/room1">
          <button className="secretButton" id="roomOneButton">
            room 1
          </button>
        </Link>
        <Link to="/backroom">
          <button className="secretButton" id="backRoomButton">
            backroom
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HouseOfRiddlez;
