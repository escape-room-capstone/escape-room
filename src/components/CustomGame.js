import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singeleRoom';
import { componentMapping } from './Puzzles/puzzles';
import Modal from 'react-modal';
import { customStyles } from '../utils/helpers';
import { fetchGame } from '../store/game';
import '../../public/CSS/CustomGame.css';
import '../../public/CSS/Burger.css';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const _CustomGame = (props) => {
  //this may have been causing a bug
  // const { room } = props;
  // const { puzzles } = room;
  // console.log('Our Puzzles', puzzles);
  const [roomStatus, setRoomStatus] = useState({});
  const [puzzleDimensions, setPuzzleDimensions] = useState({});
  let { gameId, roomId, idx } = props.match.params;
  const [currentPuzzles, setCurrentPuzzles] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await props.getGame(gameId)      
      await props.getRoom(gameId, roomId);      
    };
    getData();        
  }, []);

  useEffect(() => {
    if (props.room.id === props.match.params.roomId * 1) {      
      // if (puzzles && puzzles[0].roomdata) {
      const { puzzles } = props.room;
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
          top: currentPuzzle.roomdata ? currentPuzzle['roomdata'].top : '',
          left: currentPuzzle.roomdata ? currentPuzzle['roomdata'].left : '',
          width: currentPuzzle.roomdata ? currentPuzzle['roomdata'].width : '',
          height: currentPuzzle.roomdata
            ? currentPuzzle['roomdata'].height
            : '',
        };
        return dimensionsObj;
      }, {});
      setPuzzleDimensions(puzzleDims);
      setRoomStatus(_roomStatus);
    }
    // }
  }, [props.room]);
  
  
  
  const sortedRoomsArray = props.game.rooms ? props.game.rooms.sort((roomA, roomB) => {
    return roomA.number - roomB.number
  }) : [];
  console.log(sortedRoomsArray, "SORTED ROOMS ARR");

  const handleNextRoom = (gameId, roomId) => {
    // console.log(gameId, "Game ID")
    // console.log(roomId, "ROOM ID");
    
    
    console.log(sortedRoomsArray);
    idx++;    
    let index = parseInt(idx);
    if(sortedRoomsArray[index]){    
    let nextRoomId = sortedRoomsArray[index].id
    console.log(nextRoomId, "NEXT ROOM ID");
    roomId = nextRoomId;    
    props.history.push(`/games/${gameId}/${nextRoomId}/${idx}`);          
    window.location.reload();
    }
    else{
      props.history.push("/victorypage");
    }

  }  
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

  const { room, game } = props;
  const { puzzles } = room;
  if (Object.keys(roomStatus).length) {
    return (

      <div>
        <Menu>
          <Link className="menu-item" to="/">
            Home
          </Link>
          <Link className="menu-item--small" to="">
            Profile
          </Link>
          <Link id="quit" className="menu-item" to="">
            Quit
          </Link>
        </Menu>
        <div id="game-narrative">
          <p>{room.narrative}</p>
        </div>
        <div id="lock-images">
          {puzzles.map((puzzle, idx) => (
            <div key={idx}>
              <img
                height="40px"
                width="40px"
                src={
                  roomStatus[puzzle.id].solved
                    ? '/Images/check.png'
                    : '/Images/lock.png'
                }
              />
            </div>
          ))}
        </div>
        <div>
          <div
            id="game-room"
            style={{
              backgroundImage: `url(${room.imgSrc})`,
              height: '559px',
              width: '1000px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              margin: '0 auto',
              position: 'relative',
              border: '5px solid black',
            }}
          >
            {Object.keys(roomStatus).map((puzzleNum, idx) => (
              <div
                style={{
                  top: `${
                    puzzleDimensions[puzzleNum]
                      ? puzzleDimensions[puzzleNum].top
                      : ''
                  }px`,
                  left: `${
                    puzzleDimensions[puzzleNum]
                      ? puzzleDimensions[puzzleNum].left
                      : ''
                  }px`,
                  width: `${
                    puzzleDimensions[puzzleNum]
                      ? puzzleDimensions[puzzleNum].width
                      : ''
                  }px`,
                  height: `${
                    puzzleDimensions[puzzleNum]
                      ? puzzleDimensions[puzzleNum].height
                      : ''
                  }px`,
                  border: '4px solid red',
                  position: 'absolute',
                }}
                key={idx}
              >
                <button onClick={() => show(puzzleNum)}>
                  Puzzle {puzzleNum}
                </button>
              </div>
            ))}

            <div>
              {puzzles.map((puzzle, idx) => {
                const Component = componentMapping[puzzle.name];
                return (
                  <Modal isOpen={roomStatus[puzzle.id].showModal} key={idx}>
                    <div>{puzzle.roomdata.puzzleText}</div>
                    <hr />
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
        </div>
        <button onClick={(gameId, roomId)=>handleNextRoom(game.id, room.id)}> NEXT ROOM </button>
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
    getGame : (gameId) => dispatch(fetchGame(gameId))
  };
};

export const CustomGame = connect(mapState, mapDispatch)(_CustomGame);
