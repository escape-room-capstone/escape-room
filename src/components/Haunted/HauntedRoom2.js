import React, { useEffect, useState } from 'react';
import { componentMapping } from '../Puzzles/puzzles';
import { connect } from 'react-redux';
//react-burger-menu
import { slide as Menu } from 'react-burger-menu';
import { Burger } from '../Burger';

import { Stage, Layer, Rect, Image } from 'react-konva';
import useImage from 'use-image';
//custom modal styles
import { customStyles } from '../../utils/helpers';
//import css file
import '../../../public/css/HauntedRoom.css';

import { fetchGame, updateTimer } from '../../store/game';
import GameTimer from '../../utils/GameTimer';

//react modal
import Modal from 'react-modal';

// set style for the game timer
const defaultTimerStyle = { barColor: '#3c15eb', digitColor: 'white' };

//background image
const HauntedHallway = (props) => {
  const [image] = useImage('/Images/spooky-stairs.jpg');
  return <Image image={image} />;
};
// lock or check image
export const Lock = (props) => {
  const [lock] = useImage('/Images/lock.png');
  const [greenCheck] = useImage('/Images/check.png');
  return (
    <Image
      x={props.x}
      y={props.y}
      height={35}
      width={35}
      image={props.solved ? greenCheck : lock}
    />
  );
};

const _HauntedRoom2 = (props) => {
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
  //helper function that takes a clueNum and sets the clue.show to be false, clue.solved to be true,
  //and showModal to be false (may need to change later if we don't want modal to close with solving a clue)
  const setSolved = (clue) => {
    setRoom((prevRoom) => {
      return {
        ...prevRoom,
        showModal: false,
        clues: {
          ...prevRoom.clues,
          [clue]: {
            show: false,
            solved: true,
          },
        },
      };
    });
  };
  //helper function that takes a clueNumber and shows the modal and the clue
  const show = (clue) => {
    setRoom((prevRoom) => {
      return {
        ...prevRoom,
        showModal: true,
        clues: {
          ...prevRoom.clues,
          [clue]: {
            ...prevRoom.clues[clue],
            show: true,
          },
        },
      };
    });
  };
  const saveCountdown = async (time) => {
    console.log(gameId, 'gameId');
    await props.saveTimer(gameId, time);
    props.history.push(`/haunted/${gameId}/room2/success`);
  };
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };
  const [room, setRoom] = useState({ clues: roomClues, showModal: false });
  const [roomSolved, setRoomSolved] = useState(false);
  const { puzzles } = props.game;
  const { gameId } = props.match.params;

  useEffect(() => {
    async function fetchGame() {
      await props.getGame(gameId);
    }
    fetchGame();
  }, []);

  useEffect(() => {
    if (Object.keys(room.clues).every((key) => room.clues[key].solved)) {
      setRoomSolved(true);
    }
  }, [room]);
  //timer data
  const { timer, countdown } = props.game;
  return (
    <div className="game-room">
      <Burger {...props} />
      <div id="utils">
        <div className="game-timer">
          <GameTimer
            gameId={gameId}
            history={props.history}
            timer={timer}
            countdown={countdown}
            timerToggle={true}
            roomSolved={roomSolved}
            saveCountdown={(time) => saveCountdown(time)}
            styleInput={defaultTimerStyle}
          />
        </div>
        <div id="lock-images">
          {Object.keys(room.clues).map((key, idx) => (
            <div key={idx}>
              <img
                height="40px"
                width="40px"
                src={
                  room.clues[key]
                    ? room.clues[key].solved
                      ? '/Images/check.png'
                      : '/Images/lock.png'
                    : 'hello'
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="narrative">
        {' '}
        <p>
          You rush inside the house. Staring at you are what can only be
          described as three spectral beings...
        </p>
      </div>
      <Stage
        onClick={(e) => {
          console.log(e.evt.layerX, 'layerX position');
          console.log(e.evt.layerY), 'layerY position)';
        }}
        height={559}
        align="center"
        width={1000}
      >
        <Layer>
          <HauntedHallway />
          <Rect
            onMouseOver={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'default';
            }}
            onClick={() => show('one')}
            solved={room.clues.one.solved}
            x={375}
            y={250}
            opacity={0}
            width={80}
            height={200}
            fill="green"
          />

          <Rect
            onMouseOver={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'default';
            }}
            onClick={() => show('two')}
            solved={room.clues.two.solved}
            x={560}
            y={270}
            opacity={0}
            width={45}
            height={100}
            fill="green"
          />

          <Rect
            onMouseOver={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'default';
            }}
            onClick={() => show('three')}
            solved={room.clues.three.solved}
            x={480}
            y={155}
            opacity={0}
            width={50}
            height={90}
            fill="green"
          />
        </Layer>
      </Stage>

      <Modal style={customStyles} isOpen={room.showModal}>
        {room.clues.one.show && (
          <div>
            <Puzzle1 solve={() => setSolved('one')} />
            <button onClick={() => setSolved('one')}>[Dev] solve</button>
          </div>
        )}
        {room.clues.two.show && (
          <div>
            <Puzzle2 solve={() => setSolved('two')} />{' '}
            <button onClick={() => setSolved('two')}>[Dev] solve</button>
          </div>
        )}
        {room.clues.three.show && (
          <div>
            <Puzzle3 solve={() => setSolved('three')} />{' '}
            <button onClick={() => setSolved('three')}>[Dev] solve</button>
          </div>
        )}
        <br></br>
        <button
          onClick={() =>
            setRoom((prevRoom) => {
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
          Close
        </button>
      </Modal>
      <div>
        <button
          style={{ textAlign: 'left' }}
          onClick={() => props.history.push(`/haunted/${gameId}/room2/success`)}
        >
          [Dev] next room
        </button>
      </div>
    </div>
  );
};
const mapDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
    saveTimer: (gameId, time) => dispatch(updateTimer(gameId, time)),
  };
};

export const HauntedRoom2 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom2);
