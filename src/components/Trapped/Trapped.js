import React, { useState, useEffect } from 'react';
import '../../../public/CSS/Trapped.css';
import { Link } from 'react-router-dom';

const Trapped = (props) => {
  return (
    <div className="container">
      <div className="background" id="home">
        <Link to="/room2">
          <button className="secretButton" id="roomTwoButton">
            room 2
          </button>
        </Link>
        <Link to="/attic">
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

export default Trapped;
