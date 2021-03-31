import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singeleRoom';
import { componentMapping } from './Puzzles/puzzles';
import Modal from 'react-modal';
import { customStyles } from '../utils/helpers';
import { fetchUserGame } from '../store/game';

//url will be /games/:gameId/:roomId/:roomNum
//What limit do we want on amount of puzzles in one room?
//for example if we want a max of 10 puzzles in a room,
//Thinking maybe we could make roomClues 1 - 10, and use a ternary to render a button for the puzzle only if the puzzle exists in props.room.puzzles
//Have to think about this one...
const _CustomGame = (props) => {
  const { room } = props;
  const { puzzles } = room;
  console.log('Our Puzzles', puzzles);

  //Work in progress...
  //Creates the room clues dynamically based on how many puzzles we have in this room...

  // console.log('Room clues using .reduce', _roomClues);

  // const roomClues = {
  //   1: { solved: false, show: false },
  //   2: { solved: false, show: false },
  //   3: { solved: false, show: false },
  // };
  const [roomStatus, setRoomStatus] = useState({});
  const [ puzzleDimensions, setPuzzleDimensions ] = useState({});  
  // const { gameId, roomNum } = props.match.params;

  const { gameId, roomId } = props.match.params;
  useEffect(() => {
    const getRoom = async () => {
      await props.getRoom(gameId, roomId);
      // props.getGame(2, gameId, 'custom');
      // props.getRoom(gameId, roomId);
    };
    getRoom();
  }, []);
  useEffect(() => {
    if (puzzles && puzzles[0].roomdata) {      
      const _roomStatus = puzzles.reduce((cluesObj, currentPuzzle) => {
        cluesObj[currentPuzzle.id] = {
          solved: false,
          show: false,
          showModal: false,
        };

        return cluesObj;
      }, {});

      const puzzleDims = puzzles.reduce((dimensionsObj, currentPuzzle) => {
        dimensionsObj[currentPuzzle.id] = {
          top : currentPuzzle.roomdata ? currentPuzzle['roomdata'].top : "",
          left : currentPuzzle.roomdata ? currentPuzzle['roomdata'].left : "",
          width: currentPuzzle.roomdata ? currentPuzzle['roomdata'].width : "",
          height: currentPuzzle.roomdata ? currentPuzzle['roomdata'].height : ""
        };    
        return dimensionsObj;
      }, {});      
      setPuzzleDimensions(puzzleDims);
      setRoomStatus(_roomStatus);      
    }
  }, [props.room]);
  console.log(roomStatus, 'roomstatus');

  //dynamically rendering components based on which puzzles are in the array from the DB

  //Put some very simple logic in place for now...
  //if statement to see if the puzzle is in our puzzlesarray so we don't get an error for now...
  //Need to find a way to dynamically render puzzle/modals based on amount of puzzles in game... will do later
  // const Puzzle1 = (props) => {
  //   const Component = componentMapping[puzzles[0].name];
  //   return <Component {...props} />;
  // };
  // const Puzzle2 = (props) => {
  //   const Component = componentMapping[puzzles[1].name];
  //   return <Component {...props} />;
  // };
  // const Puzzle3 = (props) => {
  //   const Component = componentMapping[puzzles[2].name];
  //   return <Component {...props} />;
  // };

  //Have to use ternary operator because on first render, room is an EMPTY OBJECT
  //map over puzzle array inside of room to dynamically render amount of puzzles in array.
  // const CMPuzzles = room.puzzles ? room.puzzles.map(puzzle => {
  //   const Component = componentMapping[puzzle.name];
  //   return <Component {...props} />
  // }) : [];

  // console.log("CM PUZZLES", CMPuzzles);

  //helper function that takes a puzzleNumber and sets it as solved and updates local state
  const setSolved = (puzzleNum) => {
    setRoomStatus((prevRoomStatus) => {
      return {
        ...prevRoomStatus,
        [puzzleNum]: { show: false, solved: true, showModal: false },
      };
    });
  };

  const hide = (puzzleNum) => {
    setRoomStatus((prevRoom) => {
      return {
        ...prevRoom,
        [puzzleNum]: { ...prevRoom[puzzleNum], showModal: false },
      };
    });
  };

  const show = (puzzleNum) => {
    setRoomStatus((prevRoom) => {
      return {
        ...prevRoom,
        [puzzleNum]: { ...prevRoom[puzzleNum], showModal: true },
      };
    });
  };

  if (Object.keys(roomStatus).length) {        
    return (
      <div
        id="game-room"
        style={{
          backgroundImage: `url(${room.imgSrc})`,
          height: '800px',
          width: '1440px',
          backgroundSize: 'cover',
          margin: '0 auto',
        }}
      >        
      
        {Object.keys(roomStatus).map((puzzleNum, idx) => (
          <div style={{ top : `${ puzzleDimensions[puzzleNum] ? puzzleDimensions[puzzleNum].top : ""}px`, left : `${ puzzleDimensions[puzzleNum] ? puzzleDimensions[puzzleNum].left : ""}px`, width : `${ puzzleDimensions[puzzleNum] ? puzzleDimensions[puzzleNum].width : ""}px`, height : `${ puzzleDimensions[puzzleNum] ? puzzleDimensions[puzzleNum].height : ""}px`, border : "4px solid red", position : "relative", }} key={idx}>
            <button onClick={() => show(puzzleNum)}>Puzzle {puzzleNum}</button>
          </div>
        ))}

        <div>
          {puzzles.map((puzzle, idx) => {
            const Component = componentMapping[puzzle.name];
            return (
              <Modal isOpen={roomStatus[puzzle.id].showModal} key={idx}>
                <Component solve={() => setSolved(puzzle.id)} />
                <button onClick={() => hide(puzzle.id)}>CLOSE</button>
                <button onClick={() => setSolved(puzzle.id)}>SOLVE</button>
              </Modal>
            );
          })}

          {/* <Modal style={customStyles} isOpen={roomStatus.showModal}>
          {Object.keys(roomStatus).map((puzzleNum) => (
            <div>
              {roomStatus[puzzleNum].show &&
                generatePuzzle(`Puzzle${puzzleNum}`)}
            </div>
          ))} */}
          {/* {roomStatus.clues[1].show && (
            <Puzzle1 solve={() => setSolved('one')} />
          )}
          {roomStatus.clues[2].show && (
            <Puzzle2 solve={() => setSolved('two')} />
          )}
          {roomStatus.clues[3].show && (
            <Puzzle3 solve={() => setSolved('three')} />
          )} */}
          {/* <button
            onClick={() =>
              setRoomStatus((prevRoom) => {
                return {
                  ...prevRoom,
                  showModal: false,
                  clues: {
                    ...prevRoom.clues,
                    one: { ...prevRoom.clues.one, show: false },
                    two: { ...prevRoom.clues.two, show: false },
                    three: { ...prevRoom.clues.three, show: false },
                  },
                };
              })
            }
          >
            Close the modal
          </button>
        </Modal> */}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    getRoom: (gameId, roomId) => dispatch(fetchRoom(gameId, roomId)),
    getGame: (userId, gameId) => dispatch(fetchUserGame(userId, gameId)),
  };
};

export const CustomGame = connect(mapState, mapDispatch)(_CustomGame);
