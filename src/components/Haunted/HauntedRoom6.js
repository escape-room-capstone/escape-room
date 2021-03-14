import React, { useState } from 'react';
import {
  Stage,
  Layer,
  Star,
  Text,
  Circle,
  Line,
  Group,
  Image,
  Rect,
} from 'react-konva';

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
const ForestDoor = (props) => {
  const [image] = useImage('/Images/forestdoor.jpg');
  return <Image image={image} />;
};
export const HauntedRoom6 = (props) => {
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };

  const [room, setRoom] = useState({ clues: roomClues, showModal: false });
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

          <Lock
            showClue={() => show('one')}
            solved={room.clues.one.solved}
            x={1075}
            y={50}
          />

          {/* <Rect
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
            x={150}
            y={300}
            opacity={0}
            width={155}
            height={100}
            fill="green"
          /> */}
        </Layer>
      </Stage>
    </div>
  );
};
