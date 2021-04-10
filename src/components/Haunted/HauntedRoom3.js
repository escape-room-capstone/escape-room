import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Circle, Image, Text } from 'react-konva';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import '../../../public/css/HauntedRoom.css';
import GameTimer from '../../utils/GameTimer';
import { updateTimer } from '../../store/game';
import { Burger } from '../Burger';

// set style for the game timer
const defaultTimerStyle = { barColor: '#3c15eb', digitColor: 'white' };

const DarkRoom = (props) => {
  const [image] = useImage('/Images/darkroom.jpg');
  return <Image image={image} />;
};
const KeyPad = (props) => {
  const [image] = useImage('/Images/keypad.jpg');
  return (
    <Image
      onClick={props.open}
      onMouseEnter={props.toggleIlluminate}
      onMouseLeave={props.toggleIlluminate}
      opacity={props.show ? 1 : 0}
      x={700}
      y={190}
      height={120}
      width={100}
      image={image}
    />
  );
};
export const _HauntedRoom3 = (props) => {
  const saveCountdown = async (time) => {
    await props.saveTimer(gameId, time); // to persistently reset timer here during testing, change to 'time = 1000'
    props.history.push(`/haunted/${gameId}/room4`);
  };
  const [showKeyPad, setShowKeyPad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [keypad, setKeypad] = useState({ entries: [], errror: false });
  // const [advance, setAdvance] = useState(false);
  const [roomSolved, setRoomSolved] = useState(false);
  const { gameId } = props.match.params;
  const { timer, countdown } = props.game;

  const [cirlceVisibility, setCircleVisibility] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const addNumber = (num) => {
    setKeypad((prevKeypad) => ({
      ...prevKeypad,
      entries: [...prevKeypad.entries, num],
    }));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setRoomSolved(true);
      }, 1000);
    }
    if (keypad.error) {
      setTimeout(
        () => setKeypad((prevKeypad) => ({ ...prevKeypad, error: false })),
        1000
      );
    }
    if (keypad.entries.length === 4) {
      if (keypad.entries.join('') === '1337') {
        setSuccess(true);
      } else {
        setKeypad({ entries: [], error: true });
      }
    }
  }, [keypad, success]);
  const enterNumber = (x, y) => {
    if (x >= 102 && x <= 159) {
      if (y >= 60 && y <= 133) addNumber(1);
      if (y >= 134 && y <= 191) addNumber(4);
      if (y >= 213 && y <= 265) addNumber(7);
    }
    if (x >= 174 && x <= 227) {
      if (y >= 60 && y <= 133) addNumber(2);
      if (y >= 134 && y <= 191) addNumber(5);
      if (y >= 213 && y <= 265) addNumber(8);
      if (y >= 288 && y <= 340) addNumber(0);
    }
    if (x >= 244 && x <= 297) {
      if (y >= 60 && y <= 133) addNumber(3);
      if (y >= 134 && y <= 191) addNumber(6);
      if (y >= 213 && y <= 265) addNumber(9);
    }
  };
  return (
    <div
      style={{ cursor: 'url(/Images/flashlight.cur),auto' }}
      className="game-room"
    >
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
      </div>
      <div className="narrative">
        {' '}
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="The door slams shut behind you..."
          typeSpeed={80}
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
          <DarkRoom />
          <KeyPad
            open={() => setShowModal(true)}
            toggleIlluminate={() => setShowKeyPad(!showKeyPad)}
            show={showKeyPad}
          />

          <Circle
            onMouseOver={() =>
              setCircleVisibility((prev) => ({ ...prev, one: true }))
            }
            opacity={cirlceVisibility.one ? 1 : 0}
            x={500}
            y={200}
            fill="white"
            radius={30}
          ></Circle>
          <Text x={495} y={190} text="7" flll="red" fontSize={25}></Text>

          <Circle
            onMouseOver={() =>
              setCircleVisibility((prev) => ({ ...prev, two: true }))
            }
            opacity={cirlceVisibility.two ? 1 : 0}
            x={200}
            y={400}
            fill="white"
            radius={30}
          ></Circle>
          <Text x={195} y={390} text="1" flll="red" fontSize={25}></Text>

          <Circle
            onMouseOver={() =>
              setCircleVisibility((prev) => ({ ...prev, three: true }))
            }
            opacity={cirlceVisibility.three ? 1 : 0}
            x={200}
            y={200}
            fill="white"
            radius={30}
          ></Circle>
          <Text x={200} y={190} text="3" flll="red" fontSize={25}></Text>

          <Circle
            onMouseOver={() =>
              setCircleVisibility((prev) => ({ ...prev, four: true }))
            }
            opacity={cirlceVisibility.four ? 1 : 0}
            x={670}
            y={460}
            fill="white"
            radius={30}
          ></Circle>
          <Text x={665} y={450} text="3" flll="red" fontSize={25}></Text>
        </Layer>
      </Stage>

      <Modal isOpen={showModal}>
        <div className="keypad">
          <img
            onClick={(e) => {
              enterNumber(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            }}
            src="/Images/keypad.jpg"
          />

          <div className={keypad.error ? 'keypad-entry red' : 'keypad-entry'}>
            <p>{keypad.entries.join('')}</p>
          </div>
          {keypad.error ? (
            <div className="error">
              <p>Incorrect Entry</p>
            </div>
          ) : (
            ''
          )}
          {success ? <div className="success">CORRECT</div> : ''}
          <button onClick={() => setShowModal(false)}>CLOSE</button>
        </div>
      </Modal>
      <div>
        <button onClick={() => props.history.push(`/haunted/${gameId}/room4`)}>
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

export const HauntedRoom3 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom3);
