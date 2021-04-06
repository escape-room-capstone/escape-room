import axios from "axios";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCustomGame } from "../../store/game";

//hard-coded user Id for now
// const userId = 2;

//url will be /users/userId/account/games
const AssignPuzzles = (props) => {
  //const [game, setGame] = useState([]);
  const [unassignedPuzzles, setPuzzleArray] = useState([]);
  const [roomOrderObj, setRoomOrderObj] = useState({});
  const [buttonBoolean, setButtonBoolean] = useState(false);
  const [puzzleButtonBoolean, setPuzzleButtonBoolean] = useState(false);

  //this is just for the Modal to open and close
  const [order, setOrder] = useState(false);

  const userId = props.match.params.userId;
  const gameId = props.match.params.gameId;
  const { game } = props;
  useEffect(() => {    
    props.fetchGame(userId, gameId);
  }, []);

  useEffect(() => {
    if (game) {
      const roomsObj = game.rooms
        ? game.rooms.reduce((roomObj, currentRoom) => {
            roomObj[currentRoom.id] = {
              roomNumber : currentRoom.number,
              puzzles : currentRoom.puzzles.reduce((puzzleObj, currentPuzzle) => {                                
                puzzleObj[currentPuzzle.id] = currentPuzzle.name
                return puzzleObj
              }, {})
            };
            return roomObj;
          }, {})
        : [];
      setRoomOrderObj(roomsObj);      
    }
  }, [props.game]);

  //console.log("OUR GAME", props.game);

  //array used to generate select tag in modal
  const totalRooms = game.rooms
    ? game.rooms.map((room) => {
        return room.number;
      })
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //array used to generate select tag for puzzle options
  const allPuzzles = game.rooms
    ? game.rooms
        .reduce((puzzleArray, currentRoom) => {
          //pushing all of our puzzles into puzzleArray (which is our accumulator starting off at an empty array)
          currentRoom.puzzles.forEach((puzzle) => puzzleArray.push(puzzle)); 
          //returning a sorted puzzle array, sorted by puzzle ID         
          return puzzleArray.sort((puzzleA, puzzleB) => {
            return puzzleA.id - puzzleB.id;
          });
        }, [])
        //Then mapping over the puzzleArray to generate just the names of the Puzzles, IN ORDER BY ID since we sorted by id...
        .map((puzzle) => {
          return puzzle.name;
        })
    : ["No Puzzles"];



  

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
    //boolean returned from this function being console.logged
    //console.log([...new Set(array)].length !== array.length)
    return [...new Set(array)].length !== array.length;
  };

  // Handles change of room orders
  const handleChangeOrder = (e, roomId) => {
    const roomObjCopy = { ...roomOrderObj };

    roomObjCopy[roomId].roomNumber = e.target.value * 1;
    
    const roomObjValues = Object.values(roomObjCopy).map(room => {
      return room.roomNumber
    });
    console.log(roomObjValues, "we here");    

    //checkForDuplicates function takes an array and will return TRUE if there are duplicates

    setButtonBoolean(checkForDuplicates(roomObjValues));
    setRoomOrderObj(roomObjCopy);
  };

  // Handles change of assigned puzzles to specific room... 
  const handlePuzzleChange = (e, roomId, puzzleId) => {
    const roomObjCopy = { ...roomOrderObj };

    console.log(roomObjCopy[roomId].puzzles[puzzleId]);
    console.log(e.target.value);    
    roomObjCopy[roomId].puzzles[puzzleId] = e.target.value;  
    
    
    //an array of puzzleNames that we can check for duplicates now with our function...
    const puzzleObjValues = Object.values(roomObjCopy).map(room => {
      return Object.values(room.puzzles)
    }).flat();
    
    
           
    setPuzzleButtonBoolean(checkForDuplicates(puzzleObjValues));
    
    setRoomOrderObj(roomObjCopy);
  };

  const handlePuzzleSubmit = async() => {
    console.log("Puzzle order submitted");
    console.log("state object currently", roomOrderObj);
    

    await axios.put("/api/rooms", roomOrderObj);

    //props.fetchGame(userId, gameId);
    
  }

  const handleRoomOrderSubmit = async () => {
    console.log(roomOrderObj, "ROOM ORDER OBJ");

    await axios.put("/api/rooms", roomOrderObj);

    props.fetchGame(userId, gameId);
    setOrder(false);
  };

  const handleRemove = (roomId, puzzleId) => {
    setPuzzleArray([...unassignedPuzzles, puzzleId]);
  };

  

  return (
    <div style={{ paddingLeft: "10px" }}>
      <h1>Rooms for your game</h1>
      <button onClick={() => setOrder(true)}> Change order of rooms </button>
      <h2>
        {" "}
        Unassigned Puzzles :{" "}
        {unassignedPuzzles.map((puzzleId) => {
          return <small key={puzzleId}> Puzzle{puzzleId} </small>;
        })}{" "}
      </h2>
      <hr />
      {sortedRoomArray.map((room) => {
        return (
          <div key={room.id}>
            <p> Room {room.number} </p>
            <div>
              <img style={{ width: "200px" }} src={room.imgSrc} />
            </div>
            <button
              onClick={() => props.history.push(`/editsingleroom/${room.id}`)}
            >
              {" "}
              Customize{" "}
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
                        </button>{" "}                                        
                <select
                  value={roomOrderObj[room.id] ? roomOrderObj[room.id].puzzles[puzzle.id] : "roomOrderObj undefined"}
                  onChange={(e, puzzleId) => handlePuzzleChange(e, room.id, puzzle.id)}
                >
                  {allPuzzles.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>                                      
                      </li>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        );
      })}
      <button onClick={()=>handlePuzzleSubmit()} disabled={puzzleButtonBoolean} style={{ color : puzzleButtonBoolean ? "red" : ""}}> {puzzleButtonBoolean ? "Cannot assign same puzzle to different rooms" : "Submit Puzzle Placement" } </button>
      <br />
      <button
        onClick={() => props.history.push(`/users/${userId}/account/games`)}
      >
        {" "}
        Finished Customizing Game{" "}
      </button>
      <Modal isOpen={order}>
        {!puzzleButtonBoolean ? <div>        
        <h1>
          {" "}
          Number your rooms in the order you would like them displayed...
        </h1>
        {sortedRoomArray.map((room) => {
          return (
            <div key={room.id}>
              <p> Room {room.number}</p>
              <img style={{ width: "200px" }} src={room.imgSrc} />
              <label>
                Order :
                <select
                  value={roomOrderObj[room.id] ? roomOrderObj[room.id].roomNumber : "roomOrderObj undefined"}
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
          {" "}
          Submit{" "}
        </button>
        <button onClick={() => setOrder(false)}> Close </button>
        {buttonBoolean ? (
          <p style={{ color: "red" }}> Each room should have a unique room number !</p>
        ) : (
          ""
        )}
        </div> : <div> 
          <h1> Please make sure you don't have the same puzzles in different rooms ! </h1> 
          <button onClick={() => setOrder(false)}> Close </button>
          </div>}
      </Modal>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  fetchGame: fetchCustomGame,
};
export default connect(mapState, mapDispatch)(AssignPuzzles);
