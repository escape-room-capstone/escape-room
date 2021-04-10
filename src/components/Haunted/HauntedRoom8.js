import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Burger } from '../Burger';
import { connect } from 'react-redux';

//import clue
import { Room8Clue1 } from './Clues';

//react modal
import Modal from 'react-modal';

//import css file
import '../../../public/css/HauntedRoom.css';

//custom modal styles
import { customStyles } from '../../utils/helpers';

import { fetchGame, updateTimer } from '../../store/game';
import GameTimer from '../../utils/GameTimer';

// set style for the game timer
const defaultTimerStyle = { barColor: '#3c15eb', digitColor: 'white' };

//make images to attach to stage
const NightGrass = (props) => {
  const [image] = useImage('/Images/nightgrass2.jpg');
  return <Image image={image} />;
};
const Phone = (props) => {
  const [image] = useImage('/Images/hauntedphone.png');
  return (
    <Image
      onClick={props.showModal}
      x={450}
      y={500}
      height={40}
      width={50}
      image={image}
    />
  );
};

const _HauntedRoom8 = (props) => {
  const saveCountdown = async (time) => {
    await props.saveTimer(gameId, time); // to persistently reset timer here during testing, change to 'time = 1000'
    props.history.push(`/haunted/${gameId}/room9/`);
  };
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    first: '',
    middle: '',
    last: '',
  });
  const { gameId } = props.match.params;
  const { timer, countdown } = props.game;
  const [roomSolved, setRoomSolved] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      await props.getGame(gameId);
    }
    fetchGame();
  }, []);
  const checkAnswer = () => {
    if (
      phoneNumber.first + phoneNumber.middle + phoneNumber.last ===
      '2032469853'
    ) {
      setRoomSolved(true);
      props.history.push('/haunted/1/room9');
    }
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
          <img
            height="40px"
            width="40px"
            src={roomSolved ? '/Images/check.png' : '/Images/lock.png'}
          />
        </div>
      </div>
      <div className="narrative">
        <p>
          {' '}
          You run through the forest and see a road through the grass ahead of
          you...Something in the grass catches your eye...
        </p>
        {/* <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="You run through the forest and see a road through the grass ahead of you...Something in the grass catches your eye..."
          typeSpeed={70}
        /> */}
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
          <NightGrass />
          <Phone showModal={() => setShowModal(true)} />
        </Layer>
      </Stage>
      <Modal style={customStyles} isOpen={showModal}>
        <Room8Clue1
          checkAnswer={() => checkAnswer()}
          handleChange={(e) =>
            setPhoneNumber((prevNum) => ({
              ...prevNum,
              [e.target.name]: e.target.value,
            }))
          }
        />

        <button onClick={() => setShowModal(false)}>CLOSE</button>
        <br></br>
        <button onClick={() => setRoomSolved(true)}>[Dev] Solve</button>
      </Modal>
      <div>
        <button onClick={() => props.history.push(`/haunted/${gameId}/room9`)}>
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

export const HauntedRoom8 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom8);
