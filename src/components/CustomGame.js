import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRoom } from '../store/singeleRoom';
import { componentMapping } from './Puzzles/puzzles';
import Modal from 'react-modal';
import { customStyles } from '../utils/helpers';
import { fetchUserGame } from '../store/game';

//url will be /games/:gameId/:roomNum
const _CustomGame = (props) => {
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };
  const [roomStatus, setRoomStatus] = useState({
    clues: roomClues,
    showModal: false,
  });
  const { gameId, roomNum } = props.match.params;
  useEffect(() => {
    //hard-coded userId of 2 for now until auth is set up
    props.getGame(2, gameId, 'custom');
    props.getRoom(gameId, roomNum);
  }, []);
  const { room } = props;
  const { puzzles } = room;
  console.log(room, 'room');
  //dynamically rendering components based on which puzzles are in the array from the DB
  const Puzzle1 = (props) => {
    const Component = componentMapping[puzzles[0].name];
    return <Component {...props} />;
  };
  const Puzzle2 = (props) => {
    const Component = componentMapping[puzzles[1].name];
    return <Component {...props} />;
  };
  const Puzzle3 = (props) => {
    const Component = componentMapping[puzzles[2].name];
    return <Component {...props} />;
  };
  //helper function that takes a clueNumber and sets it as solved and updates local state
  const setSolved = (puzzleNum) => {
    setRoomStatus((prevRoom) => {
      return {
        ...prevRoom,
        showModal: false,
        clues: {
          ...prevRoom.clues,
          [puzzleNum]: {
            show: false,
            solved: true,
          },
        },
      };
    });
  };
  //helper function that takes a clueNumber and shows the modal and the clue
  const show = (puzzleNum) => {
    setRoomStatus((prevRoom) => {
      return {
        ...prevRoom,
        showModal: true,
        clues: {
          ...prevRoom.clues,
          [puzzleNum]: {
            ...prevRoom.clues[puzzleNum],
            show: true,
          },
        },
      };
    });
  };
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
      <div>
        <button onClick={() => show('one')}>1st Puzzle</button>
      </div>
      <div>
        <button onClick={() => show('two')}>2nd Puzzle</button>
      </div>
      <div>
        <button onClick={() => show('three')}>3rd Puzzle</button>
      </div>

      <div>
        <Modal style={customStyles} isOpen={roomStatus.showModal}>
          {roomStatus.clues.one.show && (
            <Puzzle1 solve={() => setSolved('one')} />
          )}
          {roomStatus.clues.two.show && (
            <Puzzle2 solve={() => setSolved('two')} />
          )}
          {roomStatus.clues.three.show && (
            <Puzzle3 solve={() => setSolved('three')} />
          )}
          <button
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
        </Modal>
      </div>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    getRoom: (gameId, roomNum) => dispatch(fetchRoom(gameId, roomNum)),
    getGame: (userId, gameId) => dispatch(fetchUserGame(userId, gameId)),
  };
};

export const CustomGame = connect(mapState, mapDispatch)(_CustomGame);
