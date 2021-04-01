import axios from 'axios';
import Modal from 'react-modal'
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//hard-coded user Id for now
// const userId = 2;

//url will be /users/userId/account/games
const AssignPuzzles = (props) => {
  const [game, setGame] = useState([]);
  const [unassignedPuzzles, setPuzzleArray] = useState([]);
  const [roomOrderObj, setRoomOrderObj] = useState({});
  const [buttonBoolean, setButtonBoolean] = useState(false);

  //this is just for the Modal to open and close
  const [order, setOrder] = useState(false);
  
  
  const userId = props.match.params.userId;
  useEffect(() => {
    const fetchGames = async () => {
      const game = (
        await axios.get(
          `/api/users/${userId}/games/custom/${props.match.params.gameId}`
        )
      ).data;
      setGame(game);
    };
    fetchGames();           
  }, []);

  useEffect(() => {
    if (game) {      
      const roomsObj = game.rooms ? game.rooms.reduce((roomObj, currentRoom) => {
        roomObj[currentRoom.id] = currentRoom.number    
        return roomObj
      }, {}): [];
      setRoomOrderObj(roomsObj);
    }
  }, [game]);
  
  console.log(game);

  //This is the object we receive from above useEffect...
  // state : {
  //   room1.id : room1.number 
  //   room2.id : room2.number
  //   room3.id : room3.number
  // }
  

      


  //array used to generate select tag in modal
  const totalRooms = game.rooms ? game.rooms.map(room => {
    return room.number
  }) : [1,2,3,4,5,6,7,8,9,10];    


  //sorted room array by number property
  const sortedRoomArray = game.rooms ? game.rooms.sort((roomA, roomB) => {
    return roomA.number - roomB.number
  }) : [];

  // checking if a user selected the same display order for two rooms...
  // returns true if we do find a duplicate...
  // the set(array).length will not equal the regular array.length if we have a duplicate because the Set constructor returns only unique values
  const checkForDuplicates = (array) => {            
      return [...new Set(array)].length !== array.length    
  }

  // Handles change of room orders
  const handleChangeOrder = (e, roomId) => {        

    const roomObjCopy = {...roomOrderObj};

    roomObjCopy[roomId] = e.target.value * 1;

    const roomObjValues = Object.values(roomObjCopy);
    
    //checkForDuplicates function takes an array and will return TRUE if there are duplicates

    setButtonBoolean(checkForDuplicates(roomObjValues));                
    setRoomOrderObj(roomObjCopy);
    
  }
  
  
  const handleRoomOrderSubmit = () => {
    console.log(roomOrderObj, "ROOM ORDER OBJ");
  }
       
  const handleRemove = (roomId, puzzleId) => {
    setPuzzleArray([...unassignedPuzzles, puzzleId]);
  };  

  return (
    <div style={{ paddingLeft: '10px' }}>
      <h1>Rooms for your game</h1>
      <button onClick={()=>setOrder(true)}> Change order of rooms </button>
      <h2>
        {' '}
        Unassigned Puzzles :{' '}
        {unassignedPuzzles.map((puzzleId) => {
          return <small key={puzzleId}> Puzzle{puzzleId} </small>;
        })}{' '}
      </h2>
      <hr />
      {
        sortedRoomArray.map((room) => {
            return (
              <div key={room.id}>
                <p> Room {room.number} </p>
                <div>
                  <img style={{ width: '200px' }} src={room.imgSrc} />
                </div>
                <button
                  onClick={() =>
                    props.history.push(`/editsingleroom/${room.id}`)
                  }
                >
                  {' '}
                  Customize{' '}
                </button>
                <p> Puzzles for Room {room.number} : </p>
                <ul>
                  {room.puzzles.map((puzzle) => {
                    return (
                      <div key={puzzle.id}>
                        {unassignedPuzzles.includes(puzzle.id) ? (
                          <p> removed </p>
                        ) : (
                          <li>
                            <button
                              onClick={() => handleRemove(room.id, puzzle.id)}
                            >
                              x
                            </button>{' '}
                            {puzzle.name}
                          </li>
                        )}
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })        }
      <button
        onClick={() => props.history.push(`/users/${userId}/account/games`)}
      >
        {' '}
        Confirm{' '}
      </button>
      <Modal isOpen={order}>
        <h1> Number your rooms in the order you would like them displayed...</h1>
        {sortedRoomArray.map(room => {
          return (
            <div key={room.id}>
              <p> Room {room.number}</p>              
              <img style={{ width: '200px' }} src={room.imgSrc} />                                 
              <label>
          Order :
          <select value={roomOrderObj[room.id]} onChange={(e, roomId)=> handleChangeOrder(e, room.id)}>{totalRooms.map( x => <option key={x}>{x}</option>)}</select>
        </label>
            </div>
          )
        })}               
        <button disabled={buttonBoolean} onClick={()=>handleRoomOrderSubmit()}> Submit </button>
        <button onClick={()=>setOrder(false)}> Close </button>
      </Modal>
    </div>
  );
};

export default connect((state) => state)(AssignPuzzles);
