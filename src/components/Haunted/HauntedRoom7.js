import React, { useState } from 'react';
import { connect } from 'react-redux';
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
//custom modal styles
import { customStyles } from '../../utils/helpers';

//background image
const Forest = (props) => {
  const [image] = useImage('/Images/forestnight.jpg');
  return <Image image={image} />;
};
export const HauntedRoom7 = (props) => {
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
          <Forest />
          <Lock
            showClue={() => show('one')}
            solved={room.clues.one.solved}
            x={975}
            y={50}
          />
          <Lock
            showClue={() => show('two')}
            solved={room.clues.two.solved}
            x={1025}
            y={50}
          />
          <Lock
            showClue={() => show('three')}
            solved={room.clues.three.solved}
            x={1075}
            y={50}
          />
        </Layer>
      </Stage>

      <Modal style={customStyles} isOpen={room.showModal}>
        <p>This is a modal. please close it now</p>
        {/* {room.clues.one.show && <Room5Clue1 solve={() => setSolved('one')} />}
        {room.clues.two.show && <Room5Clue2 solve={() => setSolved('two')} />}
        {room.clues.three.show && (
          <Room5Clue3 solve={() => setSolved('three')} />
        )} */}
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
          Close the modal
        </button>
      </Modal>
      {room.clues.one.solved &&
      room.clues.two.solved &&
      room.clues.three.solved ? (
        <Redirect push to="/haunted/room8" />
      ) : (
        ''
      )}
    </div>
  );
};