import React, { useState } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Rect, Image } from 'react-konva';
import useImage from 'use-image';
import { Redirect } from 'react-router-dom';
//custom modal styles
import { customStyles } from '../../utils/helpers';
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
// lock or check image
export const Lock = (props) => {
  const [lock] = useImage('/Images/lock.png');
  const [greenCheck] = useImage('/Images/check.png');
  return (
    <Image
      onClick={props.showClue}
      x={props.x}
      y={props.y}
      height={35}
      width={35}
      image={props.solved ? greenCheck : lock}
    />
  );
};

export const HauntedRoom2 = (props) => {
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
            onClick={() => show('one', setRoom)}
            solved={room.clues.one.solved}
            x={585}
            y={300}
            opacity={0}
            width={90}
            height={350}
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
            x={855}
            y={350}
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
            x={725}
            y={175}
            opacity={0}
            width={85}
            height={150}
            fill="green"
            draggable={true}
          />
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
