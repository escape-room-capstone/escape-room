import React, { useEffect, useState } from 'react';
//sound effect hook and sound
import useSound from 'use-sound';
// import { dooropen } from '../../sounds/opendoor.mp3';

import { Stage, Layer, Image } from 'react-konva';

//react modal
import Modal from 'react-modal';

//react-router
import { Redirect, Link } from 'react-router-dom';

import useImage from 'use-image';

//css
import '../../../public/css/HauntedRoom.css';

import TypeWriterEffect from 'react-typewriter-effect';
import { Lock } from './HauntedRoom2';
//clues

//custom modal styles
import { customStyles } from '../../utils/helpers';

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
          e.target.x() >= 710 &&
          e.target.x() <= 759 &&
          e.target.y() >= 276 &&
          e.target.y() <= 307
        ) {
          console.log('success');
          props.unlock();
        }
      }}
      draggable={true}
      x={150}
      y={530}
      opacity={props.locked ? 1 : 0}
      image={image}
    />
  );
};
export const HauntedRoom6 = (props) => {
  const roomClues = {
    one: { solved: false, show: false },
  };

  const [room, setRoom] = useState({ clues: roomClues, showModal: false });
  const [locked, setLocked] = useState(true);
  const [advance, setAdvance] = useState(false);
  //   const [play] = useSound(dooropen);
  useEffect(() => {
    if (locked === false) props.history.push('/haunted/1/room7');
  }, [locked]);

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
        height={700}
        align="center"
        width={1200}
      >
        <Layer>
          <ForestDoor />
          <Key
            locked={locked}
            unlock={() => {
              setLocked(false);
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
