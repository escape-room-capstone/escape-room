import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singeleRoom';
import { componentMapping } from './Puzzles/puzzles';
import Modal from 'react-modal';
import { fetchGame, updateTimer } from '../store/game';
import '../../public/CSS/CustomGame.css';
import '../../public/CSS/Burger.css';
import { Burger } from './Burger';
import GameTimer from '../utils/GameTimer';

const _CustomGame = (props) => {
  // set default local sate
  // const [roomOpen, setRoomOpen] = useState(false); -- FOR LATER; functionality to prevent forcing access to next room (add idx === '0' &&)
  const [roomSolved, setRoomSolved] = useState(false); // -- does this get updated to flase on next room?
  const [puzzlesReady, setPuzzlesReady] = useState(false);
  const [roomStatus, setRoomStatus] = useState({});
  const [puzzleDimensions, setPuzzleDimensions] = useState({});
  const [nextRoomOpen, setNextRoomOpen] = useState(false);

  // pick up data from props
  let { gameId, roomId, idx } = props.match.params;
  let { room, game } = props;
  let { puzzles } = room;
  let { timer, countdown } = game;

  // set style for the game timer
  const defaultTimerStyle = { barColor: '#3c15eb', digitColor: 'white' };

  // load game and room data when component mounts/updates
  useEffect(() => {
    props.setGame(gameId);
    props.setRoom(gameId, roomId);
    // setRoomOpen(true); -- FOR LATER; see comment in state declaration
  }, [gameId, roomId, idx]);

  // component clean-up
  useEffect(() => {
    return () => {
      setRoomSolved(false);
      setNextRoomOpen(false);
      setPuzzlesReady(false);
    };
  }, []);

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
    // check if roomStatus has been mapped
    if (Object.keys(roomStatus).length > 0) {
      const checkAllPuzzlesSolved = (roomStatus) => {
        for (var puzzle in roomStatus)
          if (!roomStatus[puzzle].solved) {
            return false;
          }
        return true;
      };
      checkAllPuzzlesSolved(roomStatus) && setRoomSolved(true);
    }
  }, [roomStatus]);

  // when room is solved push timer countdown to game model for use in next room
  const saveCountdown = async (time) => {
    await props.saveTimer(gameId, time);
    setNextRoomOpen(true);
  };

  // advance to next room
  const handleNextRoom = () => {
    // update local state to initiate next room with default values
    setPuzzlesReady(false);
    setRoomSolved(false);
    setNextRoomOpen(false);
    // setRoomOpen(true); -- FOR LATER; see comment in state declaration
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
        props.history.push(`/games/${gameId}/victory`);
      }
    }
  };

  // render room if the puzzles were mounted and room is open
  if (!puzzlesReady) {
    return null;
  }
  // if (!roomOpen) { -- FOR LATER; see comment in state declaration
  //   return <p>room not open</p>;
  // }
  return (
    <div id="custom-game">
      <Burger {...props} />
      <div id="game-narrative">
        <p>{room.narrative}</p>
      </div>

      <div id="game-tools">
        <div id="game-timer">
          <GameTimer
            gameId={gameId}
            history={props.history}
            timer={timer} // -- DEV NOTE: to persitently reset timer for testing, change to 'time = 1000'
            countdown={countdown}
            roomSolved={roomSolved}
            timerToggle={true}
            saveCountdown={(time) => saveCountdown(time)}
            styleInput={defaultTimerStyle}
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
            borderRadius: '20px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            margin: '1rem auto',
            position: 'relative',
            boxShadow: '1px 1px 12px 6px deepskyblue',
          }}
        >
          {Object.keys(roomStatus).map((puzzleNum, idx) => (
            <div
              onMouseOver={(e) => {
                e.target.style.cursor = 'pointer';
              }}
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
                    [Dev] solve
                  </button>
                </Modal>
              );
            })}
          </div>
        </div>
      </div>
      <div id='dev-buttons'
        style={{
          color: 'white',
          width: 1000,
          top: 20,
          left: 60,
          position: 'relative',
        }}
      >
        <p>Developer mode buttons</p>
        <button onClick={() => handleNextRoom()}>[Dev] advance next room</button>
        <br/>
        <button onClick={() => props.history.push(`/games/${gameId}/fail`)}>[Dev] load fail page</button>
      </div>
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
