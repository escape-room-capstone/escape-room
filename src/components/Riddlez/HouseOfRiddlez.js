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
  console.log('houseRiddlezProps=>', props);

  const [_isRoomTwo, setRoomTwo] = useState(false);
  const [_isRoomOne, setRoomOne] = useState(false);
  const [_isAttic, setAttic] = useState(false);
  const [_isLivingRoom, setLivingRoom] = useState(false);
  const [_isBackroom, setBackroom] = useState(false);

  useEffect(() => {
    if (_isRoomTwo) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isRoomTwo: true,
        },
        [_isRoomTwo]
      );
    }
    if (_isRoomOne) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isRoomOne: true,
        },
        [_isRoomOne]
      );
    }
    if (_isAttic) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isAttic: true,
        },
        [_isAttic]
      );
    }
    if (_isLivingRoom) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isLivingRoom: true,
        },
        [_isLivingRoom]
      );
    }
    if (_isBackroom) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isBackroom: true,
        },
        [_isBackroom]
      );
    }
  });

  return (
    <div className="houseContainer">
      {/* <LetterBank mainRoomBank={mainRoom.mainRoomBank} /> */}

      <div className="background" id="home">
        <button
          className="secretButton"
          id="roomTwoButton"
          onClick={() => {
            setRoomTwo(true);
            //   props.history.push('/HouseofRiddlez/roomtwo');
          }}
        >
          {/* <Link to="/HouseofRiddlez/room2"></Link> */}
        </button>

        <button
          className="secretButton"
          id="atticButton"
          onClick={() => {
            setAttic(true);
            // props.history.push('/HouseofRiddlez/attic');
          }}
        >
          {/* <Link to="/HouseofRiddlez/attic"></Link> */}
        </button>

        <button
          className="secretButton"
          id="livingRoomButton"
          onClick={() => {
            setLivingRoom(true);
            // props.history.push('/HouseofRiddlez/livingroom');
          }}
        >
          {/* <Link to="/HouseofRiddlez/livingroom"> </Link> */}
        </button>

        <button
          className="secretButton"
          id="roomOneButton"
          onClick={() => {
            setRoomOne(true);
            // props.history.push('/HouseofRiddlez/roomone');
          }}
        >
          {/* <Link to="/HouseofRiddlez/room1"> </Link> */}
        </button>

        <button
          className="secretButton"
          id="backRoomButton"
          onClick={() => {
            setBackroom(true);
            // props.history.push('/HouseofRiddlez/backroom');
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

// const mapToDispatch = (dispatch) => {
//   return {
//     getGame: (gameId) => dispatch(fetchGame(gameId)),
//     getPuzzles: () => dispatch(setPuzzles()),
//   };
// };

// mapToDispatch
export default connect(mapToState)(HouseOfRiddlez);
//export default HouseOfRiddlez;
