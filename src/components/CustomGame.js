import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singeleRoom';
import { componentMapping } from './Puzzles/puzzles';
import Modal from 'react-modal';
import { fetchGame, updateTimer } from '../store/game';
import '../../public/CSS/CustomGame.css';
import '../../public/CSS/Burger.css';
import { slide as Menu } from 'react-burger-menu';
import { Burger } from './Burger';
import GameTimer from '../utils/GameTimer';

const _CustomGame = (props) => {
  // set default local sate
  const [roomOpen, setRoomOpen] = useState(false);
  const [roomSolved, setRoomSolved] = useState(false); // -- does this get updated to flase on next room?
  const [puzzlesReady, setPuzzlesReady] = useState(false);
  const [roomStatus, setRoomStatus] = useState({});
  const [puzzleDimensions, setPuzzleDimensions] = useState({});
  const [nextRoomOpen, setNextRoomOpen] = useState(false);

  // pick up data from props
  let { gameId, roomId, idx } = props.match.params;
  const { room, game } = props;
  const { puzzles } = room;
  const { timer, countdown } = game;

  // load game and room data when component mounts/updates
  useEffect(() => {
    props.setGame(gameId);
    props.setRoom(gameId, roomId);
    setRoomOpen(true); // testing fucntionality to prevent forcing access to next room (add idx === '0' &&)
  }, [gameId, roomId, idx]);

  // check if puzzles are availble to set or have been updated
  useEffect(() => {
    puzzles && setPuzzles();
  }, [puzzles]);

  // check if next room is open before redirecting
  useEffect(() => {
    nextRoomOpen && handleNextRoom();
  }, [nextRoomOpen]);

  // set up puzzles (with status, locations, and thier modals)
  const setPuzzles = () => {
    // create local state for puzzles and its modal
    console.log(puzzles, 'PUZZLES FROM setPuzzles function');
    const _roomStatus = puzzles.reduce((cluesObj, currentPuzzle) => {
      cluesObj[currentPuzzle.id] = {
        solved: false,
        show: false,
        showModal: false,
      };
      return cluesObj;
    }, {});
    // set puzzles into their positions
    const _puzzleDimensions = puzzles.reduce((dimensionsObj, currentPuzzle) => {
      dimensionsObj[currentPuzzle.id] = {
        top: currentPuzzle.roomdata ? currentPuzzle['roomdata'].top : '',
        left: currentPuzzle.roomdata ? currentPuzzle['roomdata'].left : '',
        width: currentPuzzle.roomdata ? currentPuzzle['roomdata'].width : '',
        height: currentPuzzle.roomdata ? currentPuzzle['roomdata'].height : '',
      };
      return dimensionsObj;
    }, {});
    // update state with puzzle properties (status, position)
    setRoomStatus(_roomStatus);
    setPuzzleDimensions(_puzzleDimensions);
    setPuzzlesReady(true);
  };

  // show/hide puzzle modal
  const show = (puzzleNum) => {
    setRoomStatus((prevRoom) => {
      return {
        ...prevRoom,
        [puzzleNum]: { ...prevRoom[puzzleNum], showModal: true },
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

  // set each puzzle status as solved in local state
  const setSolved = (puzzleNum) => {
    setRoomStatus((prevRoomStatus) => {
      return {
        ...prevRoomStatus,
        [puzzleNum]: { show: false, solved: true, showModal: false },
      };
    });
  };

  // check if all puzzles are solved and prompt timer to save current countdown
  useEffect(() => {
    // check if room has been loaded (otherwise '.every' returns true on empty array)
    room.id &&
      Object.keys(roomStatus).every((key) => roomStatus[key].solved) &&
      setRoomSolved(true);
  }, [roomStatus]);

  // when room is solved push timer countdown to game model for use in next room
  const saveCountdown = async (time) => {
    await props.saveTimer(gameId, time); // to persitently reset timer here during testing, change to 'time = 1000'
    setNextRoomOpen(true);
  };

  // advance to next room
  const handleNextRoom = () => {
    // update local state to initiate next room with default values
    setPuzzlesReady(false);
    setRoomSolved(false);
    setNextRoomOpen(false);
    setRoomOpen(true);
    if (room) {
      // create array with rooms sorted in order
      const sortedRoomsArray = props.game.rooms
        ? props.game.rooms.sort((roomA, roomB) => {
            return roomA.number - roomB.number;
          })
        : [];
      // set next room Id and index from 'match.params.idx'
      const nextRoomIdx = parseInt(idx) + 1;
      if (sortedRoomsArray[nextRoomIdx]) {
        const nextRoomId = sortedRoomsArray[nextRoomIdx].id;
        props.history.push(`/games/${gameId}/${nextRoomId}/${nextRoomIdx}`);
      } else {
        props.history.push('/victorypage');
      }
    }
  };

  // render room if the puzzles were mounted and room is open
  if (!puzzlesReady) {
    return null;
  }
  if (!roomOpen) {
    return <p>room not open</p>;
  }

  console.log(roomStatus, 'roomStatus');
  return (
    <div id="custom-game">
      <Burger {...props} />
      <div id="game-narrative">
        <p>{room.narrative}</p>
      </div>

      <div id="game-tools">
        <div id="game-timer">
          <GameTimer
            timer={timer}
            countdown={countdown}
            roomSolved={roomSolved}
            timerToggle={true}
            saveCountdown={(time) => saveCountdown(time)}
          />
        </div>
        <div id="lock-images">
          {puzzles.map((puzzle, idx) => (
            <div key={idx}>
              <img
                height="40px"
                width="40px"
                src={
                  roomStatus[puzzle.id]
                    ? roomStatus[puzzle.id].solved
                      ? '/Images/check.png'
                      : '/Images/lock.png'
                    : 'hello'
                }
              />
            </div>
          ))}
        </div>
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
              onClick={() => show(puzzleNum)}
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
                position: 'absolute',
                border: '4px solid red',
              }}
              key={idx}
            ></div>
          ))}
          <div>
            {puzzles.map((puzzle, idx) => {
              const Component = componentMapping[puzzle.name];
              return (
                <Modal
                  isOpen={
                    roomStatus[puzzle.id]
                      ? roomStatus[puzzle.id].showModal
                      : false
                  }
                  key={idx}
                >
                  <div>{puzzle.roomdata.puzzleText}</div>
                  <hr />
                  <Component solve={() => setSolved(puzzle.id)} />
                  <button onClick={() => hide(puzzle.id)}>CLOSE</button>
                  <button onClick={() => setSolved(puzzle.id)}>SOLVE</button>
                </Modal>
              );
            })}
          </div>

          <div>
            {puzzles.map((puzzle, idx) => {
              const Component = componentMapping[puzzle.name];
              return (
                <Modal
                  isOpen={
                    roomStatus[puzzle.id]
                      ? roomStatus[puzzle.id].showModal
                      : false
                  }
                  key={idx}
                >
                  <div>{puzzle.roomdata.puzzleText}</div>
                  <hr />
                  <Component solve={() => setSolved(puzzle.id)} />
                  <button onClick={() => hide(puzzle.id)}>Close Puzzle</button>
                  <button onClick={() => setSolved(puzzle.id)}>
                    [Dev] Solve
                  </button>
                </Modal>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={() => handleNextRoom()}>[Dev] Next room</button>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    setGame: (gameId) => dispatch(fetchGame(gameId)),
    setRoom: (gameId, roomId) => dispatch(fetchRoom(gameId, roomId)),
    saveTimer: (userId, gameId, time) =>
      dispatch(updateTimer(userId, gameId, time)),
  };
};

export const CustomGame = connect(mapState, mapDispatch)(_CustomGame);
