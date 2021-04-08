import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

//sound effect hook and sound
import useSound from 'use-sound';
// import { dooropen } from '../../sounds/opendoor.mp3';

import { Stage, Layer, Image } from 'react-konva';

//react modal
import Modal from 'react-modal';

import { updateTimer } from '../../store/game';

//react-router
import { Redirect, Link } from 'react-router-dom';

import useImage from 'use-image';

//css
import '../../../public/css/HauntedRoom.css';

import TypeWriterEffect from 'react-typewriter-effect';
import { Lock } from './HauntedRoom2';

//game timer
import GameTimer from '../../utils/GameTimer';

//background image
const ForestDoor = () => {
  const [image] = useImage('/Images/forestdoor.jpg');
  return <Image image={image} />;
};

//key
const Key = (props) => {
  const [image] = useImage('/Images/hauntedkey.png');

  return (
    <Image
      onDragEnd={(e) => {
        console.log(e.target.x(), e.target.y(), 'e.target.x( + y)');
        if (
          e.target.x() >= 440 &&
          e.target.x() <= 483 &&
          e.target.y() >= 217 &&
          e.target.y() <= 240
        ) {
          console.log('success');
          props.unlock();
        }
      }}
      draggable={true}
      x={150}
      y={400}
      opacity={props.locked ? 1 : 0}
      image={image}
    />
  );
};
const _HauntedRoom6 = (props) => {
  const saveCountdown = async (time) => {
    await props.saveTimer(gameId, time); // to persistently reset timer here during testing, change to 'time = 1000'
    props.history.push(`/haunted/${gameId}/room7`);
  };
  const roomClues = {
    one: { solved: false, show: false },
  };

  const [room, setRoom] = useState({ clues: roomClues, showModal: false });
  const [locked, setLocked] = useState(true);
  const [roomSolved, setRoomSolved] = useState(false);
  const { gameId } = props.match.params;

  const { timer, countdown } = props.game;

  return (
    <div className="game-room">
      <div className="game-timer">
        <GameTimer
          timer={timer}
          countdown={countdown}
          timerToggle={true}
          roomSolved={roomSolved}
          saveCountdown={(time) => saveCountdown(time)}
        />
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
          <ForestDoor />
          <Key
            locked={locked}
            unlock={() => {
              setRoomSolved(true);
            }}
          />
          <Lock
            showClue={() => show('one')}
            solved={room.clues.one.solved}
            x={1075}
            y={50}
          />
        </Layer>
      </Stage>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
    saveTimer: (gameId, time) => dispatch(updateTimer(gameId, time)),
  };
};

export const HauntedRoom6 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom6);
