import axios from 'axios';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCustomGame } from '../../store/game';
import { Navbar } from '../Navbar';
//using choose theme css

//hard-coded user Id for now
// const userId = 2;

//url will be /users/userId/account/games
const AssignPuzzles = (props) => {
  //const [game, setGame] = useState([]);
  const [unassignedPuzzles, setPuzzleArray] = useState([]);
  const [roomOrderObj, setRoomOrderObj] = useState({});
  const [buttonBoolean, setButtonBoolean] = useState(false);

  //this is just for the Modal to open and close
  const [order, setOrder] = useState(false);

  const userId = props.match.params.userId;
  const gameId = props.match.params.gameId;
  const { game } = props;
  useEffect(() => {
    console.log(props);
    props.fetchGame(userId, gameId);
  }, []);

  useEffect(() => {
    if (game) {
      const roomsObj = game.rooms
        ? game.rooms.reduce((roomObj, currentRoom) => {
            roomObj[currentRoom.id] = currentRoom.number;
            return roomObj;
          }, {})
        : [];
      setRoomOrderObj(roomsObj);
    }
  }, [props.game]);

  console.log('OUR GAME', props.game);

  //array used to generate select tag in modal
  const totalRooms = game.rooms
    ? game.rooms.map((room) => {
        return room.number;
      })
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //sorted room array by number property
  const sortedRoomArray = game.rooms
    ? game.rooms.sort((roomA, roomB) => {
        return roomA.number - roomB.number;
      })
    : [];

  // checking if a user selected the same display order for two rooms...
  // returns true if we do find a duplicate...
  // the set(array).length will not equal the regular array.length if we have a duplicate because the Set constructor returns only unique values
  const checkForDuplicates = (array) => {
    return [...new Set(array)].length !== array.length;
  };

  // Handles change of room orders
  const handleChangeOrder = (e, roomId) => {
    const roomObjCopy = { ...roomOrderObj };

    roomObjCopy[roomId] = e.target.value * 1;

    const roomObjValues = Object.values(roomObjCopy);

    //checkForDuplicates function takes an array and will return TRUE if there are duplicates

    setButtonBoolean(checkForDuplicates(roomObjValues));
    setRoomOrderObj(roomObjCopy);
  };

  const handleRoomOrderSubmit = async () => {
    console.log(roomOrderObj, 'ROOM ORDER OBJ');

    await axios.put('/api/rooms', roomOrderObj);

    props.fetchGame(userId, gameId);
    setOrder(false);
  };

  const handleRemove = (roomId, puzzleId) => {
    setPuzzleArray([...unassignedPuzzles, puzzleId]);
  };

  return (
    <div
      id="columnDiv"
      // style={{ paddingLeft: '10px' }}
    >
      <Navbar />
      <div className="themeSection">
        <h1
          id="heading-with-button"
          // style={{ textAlign: 'center' }}
        >
          Rooms for your game
          <button id="createButton" onClick={() => setOrder(true)}>
            {' '}
            Change order of rooms{' '}
          </button>
        </h1>
        <div className="choose-theme">
          {/* {unassignedPuzzles.map((puzzleId) => {
            return <small key={puzzleId}> Puzzle{puzzleId} </small>;
          })}{' '} */}
          {/* <hr /> */}
          {sortedRoomArray.map((room) => {
            return (
              <div className="themeMap" key={room.id}>
                <h2> Room {room.number} </h2>
                <div>
                  <img
                    className="createGameImg"
                    // style={{ width: '200px' }}
                    src={room.imgSrc}
                  />
                </div>
                <div>
                  {' '}
                  <button
                  id="accountButton"
                    onClick={() =>
                      props.history.push(`/editsingleroom/${room.id}`)
                    }
                  >
                    {' '}
                    Customize{' '}
                  </button>
                </div>

                <p> Puzzles for Room {room.number} : </p>
                <ul>
                  {room.puzzles.map((puzzle) => {
                    return (
                      <div key={puzzle.id}>
                        {unassignedPuzzles.includes(puzzle.id) ? (
                          <p> removed </p>
                        ) : (
                          <li>                            
                            {puzzle.name}
                          </li>
                        )}
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            id="createButton"
            onClick={() => props.history.push(`/users/${userId}/account`)}
          >
            {' '}
            Confirm{' '}
          </button>
        </div>
      </div>

      <Modal isOpen={order}>
        <h1>
          {' '}
          Number your rooms in the order you would like them displayed...
        </h1>
        {sortedRoomArray.map((room) => {
          return (
            <div key={room.id}>
              <p> Room {room.number}</p>
              <img style={{ width: '200px' }} src={room.imgSrc} />
              <label>
                Order :
                <select
                  value={roomOrderObj[room.id]}
                  onChange={(e, roomId) => handleChangeOrder(e, room.id)}
                >
                  {totalRooms.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>
          );
        })}
        <button
          disabled={buttonBoolean}
          onClick={() => handleRoomOrderSubmit()}
        >
          {' '}
          Submit{' '}
        </button>
        <button onClick={() => setOrder(false)}> Close </button>
        {buttonBoolean ? (
          <p> Each room should have a unique room number !</p>
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  fetchGame: fetchCustomGame,
};
export default connect(mapState, mapDispatch)(AssignPuzzles);
