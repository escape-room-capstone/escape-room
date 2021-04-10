import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Image } from 'react-konva';
import { Burger } from '../Burger';
//react modal
import Modal from 'react-modal';

import { componentMapping } from '../Puzzles/puzzles';

import useImage from 'use-image';

import { fetchGame, updateTimer } from '../../store/game';
import GameTimer from '../../utils/GameTimer';
//css
import '../../../public/css/HauntedRoom.css';

// set style for the game timer
const defaultTimerStyle = { barColor: '#3c15eb', digitColor: 'white' };

import TypeWriterEffect from 'react-typewriter-effect';
import { Lock } from './HauntedRoom2';
//custom modal styles
import { customStyles } from '../../utils/helpers';

//background image
const Forest = (props) => {
  const [image] = useImage('/Images/forestnight.jpg');
  return <Image image={image} />;
};

const Owl = (props) => {
  const [image] = useImage('/Images/owl.png');
  return (
    <Image
      onClick={props.show}
      onMouseOver={props.illuminate}
      height={90}
      width={60}
      x={250}
      y={100}
      opacity={props.visibile ? 1 : 0}
      image={image}
    />
  );
};
const Wolf = (props) => {
  const [image] = useImage('/Images/wolf.png');
  return (
    <Image
      onClick={props.show}
      onMouseOver={props.illuminate}
      x={650}
      y={180}
      height={165}
      width={130}
      opacity={props.visibile ? 1 : 0}
      image={image}
    />
  );
};
const Frog = (props) => {
  const [image] = useImage('/Images/frog.png');
  return (
    <Image
      onClick={props.show}
      onMouseOver={props.illuminate}
      x={570}
      y={450}
      height={100}
      width={175}
      opacity={props.visibile ? 1 : 0}
      image={image}
    />
  );
};

const _HauntedRoom7 = (props) => {
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };

  const [room, setRoom] = useState({ clues: roomClues, showModal: false });
  const { puzzles } = props.game;
  const { gameId } = props.match.params;
  const [roomSolved, setRoomSolved] = useState(false);
  const { timer, countdown } = props.game;

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
  console.log(puzzles, 'puzzles');
  //dynamically rendering components based on which puzzles are in the array from the DB
  const Puzzle1 = (props) => {
    const Component = componentMapping[puzzles[6].name];
    return <Component {...props} />;
  };
  const Puzzle2 = (props) => {
    const Component = componentMapping[puzzles[7].name];
    return <Component {...props} />;
  };
  const Puzzle3 = (props) => {
    const Component = componentMapping[puzzles[8].name];
    return <Component {...props} />;
  };
  const saveCountdown = async (time) => {
    console.log(gameId, 'gameId');
    await props.saveTimer(gameId, time);
    props.history.push(`/haunted/${gameId}/room8/`);
  };

  const [itemsVisible, setItemsVisible] = useState({
    frog: false,
    wolf: false,
    owl: false,
  });
  const illuminate = (item) => {
    setItemsVisible((prevItems) => {
      return { ...prevItems, [item]: true };
    });
  };
  //helper functions
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
          <Forest />
          <Owl
            show={() => show('one')}
            visibile={itemsVisible.owl}
            illuminate={() => illuminate('owl')}
          />
          <Frog
            show={() => show('two')}
            visibile={itemsVisible.frog}
            illuminate={() => illuminate('frog')}
          />
          <Wolf
            show={() => show('three')}
            visibile={itemsVisible.wolf}
            illuminate={() => illuminate('wolf')}
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
        <button onClick={() => props.history.push(`/haunted/${gameId}/room8`)}>
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
export const HauntedRoom7 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom7);
