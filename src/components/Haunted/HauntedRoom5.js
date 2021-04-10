import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Image, Rect } from 'react-konva';
import { Burger } from '../Burger';
import { fetchGame, updateTimer } from '../../store/game';
import GameTimer from '../../utils/GameTimer';
//react modal
import Modal from 'react-modal';

import useImage from 'use-image';

//css
import '../../../public/css/HauntedRoom.css';

// set style for the game timer
const defaultTimerStyle = { barColor: '#3c15eb', digitColor: 'white' };

import TypeWriterEffect from 'react-typewriter-effect';
import { componentMapping } from '../Puzzles/puzzles';

//custom modal styles
import { customStyles } from '../../utils/helpers';

//background image
const GhostRoom = (props) => {
  const [image] = useImage('/Images/girlghost.jpg');
  return <Image image={image} />;
};
const _HauntedRoom5 = (props) => {
  const saveCountdown = async (time) => {
    await props.saveTimer(gameId, time); // to persistently reset timer here during testing, change to 'time = 1000'
    props.history.push(`/haunted/${gameId}/room6`);
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
      console.log('every clue solved');
      setRoomSolved(true);
    }
  }, [room]);
  // const { puzzles, game } = props;
  // const { timer, countdown } = props.game;
  //dynamically rendering components based on which puzzles are in the array from the DB
  const Puzzle1 = (props) => {
    const Component = componentMapping[puzzles[3].name];
    return <Component {...props} />;
  };
  const Puzzle2 = (props) => {
    const Component = componentMapping[puzzles[4].name];
    return <Component {...props} />;
  };
  const Puzzle3 = (props) => {
    const Component = componentMapping[puzzles[5].name];
    return <Component {...props} />;
  };

  //helper function
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
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text=""
          typeSpeed={70}
        />
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
          <GhostRoom />
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
            x={85}
            y={240}
            opacity={0}
            width={155}
            height={100}
            fill="blue"
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
            x={635}
            y={245}
            opacity={0}
            width={80}
            height={90}
            fill="white"
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
            x={415}
            y={255}
            opacity={0}
            width={60}
            height={60}
            fill="yellow"
          />
        </Layer>
      </Stage>

      <Modal style={customStyles} isOpen={room.showModal}>
        {room.clues.one.show && (
          <div>
            <Puzzle1 solve={() => setSolved('one')} />{' '}
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
        <button onClick={() => props.history.push(`/haunted/${gameId}/room6`)}>
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

export const HauntedRoom5 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom5);
