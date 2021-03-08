import React, { useState } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
import useImage from 'use-image';

//import css file
import '../../public/css/HauntedRoom.css';

// import clue components
import { ClueOne } from './HauntedRoom2Clues';

//react modal
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

//background image
const HauntedHallway = (props) => {
  const [image] = useImage('/spooky-stairs.jpg');
  return <Image image={image} />;
};
// clue image
const Clue = (props) => {
  const [clueImage] = useImage('/question.png');
  const [greenCheck] = useImage('/check.png');
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
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };
  const [clues, setClues] = useState(roomClues); //an array of clue info
  const [room, setRoom] = useState({ clues: roomClues, showModal: false });
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={100}
          cursorColor="white"
          text="Not sure why you thought this was a good idea..."
          typeSpeed={100}
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
          <HauntedHallway />
          <Clue
            showClue={() =>
              setRoom((prevRoom) => {
                return {
                  ...prevRoom,
                  showModal: true,
                  clues: {
                    ...prevRoom.clues,
                    one: { ...prevRoom.clues.one, show: true },
                  },
                };
              })
            }
            solved={room.clues.one.solved}
            name="one"
            x={625}
            y={470}
          />
          <Clue
            showClue={() =>
              setRoom((prevRoom) => {
                return {
                  ...prevRoom,
                  showModal: true,
                  clues: {
                    ...prevRoom.clues,
                    two: {
                      ...prevRoom.clues.two,
                      show: true,
                    },
                  },
                };
              })
            }
            solved={room.clues.two.solved}
            x={870}
            y={420}
          />
          <Clue
            showClue={() =>
              setRoom((prevRoom) => {
                return {
                  ...prevRoom,
                  showModal: true,
                  clues: {
                    ...prevRoom.clues,
                    three: {
                      ...prevRoom.clues.three,
                      show: true,
                    },
                  },
                };
              })
            }
            solved={clues.three.solved}
            x={750}
            y={275}
          />
        </Layer>
      </Stage>

      <Modal style={customStyles} isOpen={room.showModal}>
        <p>This is a modal. please close it now</p>
        {room.clues.one.show && <ClueOne />}
        {room.clues.two.show && 'here is clue 2'}
        {room.clues.three.show && 'here is clue 3'}
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
          Close the modal now
        </button>
      </Modal>
    </div>
  );
};
