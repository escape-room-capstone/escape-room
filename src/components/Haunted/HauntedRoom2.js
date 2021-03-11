import React, { useState } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
import useImage from 'use-image';
import { Redirect } from 'react-router-dom';

//import css file
import '../../../public/css/HauntedRoom.css';

// import clue components
import { ClueOne, ClueTwo, ClueThree } from './HauntedRoom2Clues';

//react modal
import Modal from 'react-modal';

//background image
const HauntedHallway = (props) => {
  const [image] = useImage('/Images/spooky-stairs.jpg');
  return <Image image={image} />;
};
// clue image
const Clue = (props) => {
  const [clueImage] = useImage('/Images/question.png');
  const [greenCheck] = useImage('/Images/check.png');
  return (
    <Image
      onClick={props.showClue}
      x={props.x}
      y={props.y}
      height={35}
      width={35}
      image={props.solved ? greenCheck : clueImage}
    />
  );
};
// styles for modal
const customStyles = {
  content: {
    backgroundColor: 'black',
    width: '50%',
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
export const HauntedRoom2 = (props) => {
  console.log(props.history, 'props.history');
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };

  const [room, setRoom] = useState({ clues: roomClues, showModal: false });

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
  //helper function that takes a clueNumber and sets showModal:true and sets the status of the clue.show to be true
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
  return (
    <div className="game-room">
      <div className="narrative"></div>
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
          <HauntedHallway />
          <Clue
            showClue={() => show('one')}
            solved={room.clues.one.solved}
            name="one"
            x={625}
            y={470}
          />
          <Clue
            showClue={() => show('two')}
            solved={room.clues.two.solved}
            x={870}
            y={420}
          />
          <Clue
            showClue={() => show('three')}
            solved={room.clues.three.solved}
            x={750}
            y={275}
          />
        </Layer>
      </Stage>

      <Modal style={customStyles} isOpen={room.showModal}>
        <p>This is a modal. please close it now</p>
        {room.clues.one.show && <ClueOne solve={() => setSolved('one')} />}
        {room.clues.two.show && <ClueTwo solve={() => setSolved('two')} />}
        {room.clues.three.show && (
          <ClueThree solve={() => setSolved('three')} />
        )}
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
        <Redirect push to="/haunted/room2/success" />
      ) : (
        ''
      )}
    </div>
  );
};
