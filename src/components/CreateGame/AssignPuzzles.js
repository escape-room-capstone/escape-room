import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//hard-coded user Id for now
const userId = 2;

//url will be /users/userId/account/games
const AssignPuzzles = (props) => {
  const [game, setGame] = useState([]);
  const [unassignedPuzzles, setPuzzleArray] = useState([]);
  //   const userId = props.match.params.userId
  useEffect(() => {
    const fetchGames = async () => {
      const game = (await axios.get(`/api/users/${userId}/games/custom/${props.match.params.gameId}`)).data;
      setGame(game);
    };
    fetchGames();
  }, []);

  console.log(game);

  const handleRemove = (roomId, puzzleId) => {
      
      setPuzzleArray([...unassignedPuzzles, puzzleId]);
  }

  console.log(unassignedPuzzles);

  return (
    <div>
      <h1>Rooms for your game</h1>
      <h2> Unassigned Puzzles : {unassignedPuzzles.map(puzzleId => {
          return (
          <small key={puzzleId}> Puzzle{puzzleId} </small>
          )
      })} </h2>
      <hr/>
      {game.rooms ? game.rooms.map(room => {
          return (
              <div key={room.id}>
                  <p> Room {room.number}</p>
                  <img style={{ width:"200px" }}src={room.imgSrc} />
                  <p> Puzzles for Room {room.number} : </p>
                  <ul>
                      {room.puzzles.map(puzzle => {
                          return (                                                            
                              <div key={puzzle.id}>
                                  {unassignedPuzzles.includes(puzzle.id) ? <p> removed </p> :                                                                        
                                  <li><button onClick={()=> handleRemove(room.id, puzzle.id) }>x</button> {puzzle.name}</li>                                  
                                  }
                              </div>
                              
                          )
                      })}
                  </ul>
              </div>
          )
      }) : "No rooms"}
      <button onClick={()=>props.history.push(`/users/${userId}/account/games`)}> Confirm </button>
    </div>
  );
};

export default connect((state) => state)(AssignPuzzles);
