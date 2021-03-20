import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Image } from 'react-konva';

//react modal
import Modal from 'react-modal';

import { componentMapping } from '../Puzzles/puzzles';

import useImage from 'use-image';

//import clue components - hard-coded
// import { Room7Clue1, Room7Clue2, Room7Clue3 } from './Clues';

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

const Owl = (props) => {
  const [image] = useImage('/Images/owl.png');
  return (
    <Image
      onClick={props.show}
      onMouseOver={props.illuminate}
      height={100}
      width={70}
      x={425}
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
      x={900}
      y={250}
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
  //this is now coming from DB and is set in state and mapped to props
  const { puzzles } = props;
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
  useEffect(() => {
    if (
      room.clues.one.solved &&
      room.clues.two.solved &&
      room.clues.three.solved
    ) {
      props.history.push('/haunted/room8');
    }
  }, [room]);
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
        <p>This is a modal. please close it now</p>
        {room.clues.one.show && <Puzzle1 solve={() => setSolved('one')} />}
        {room.clues.two.show && <Puzzle2 solve={() => setSolved('two')} />}
        {room.clues.three.show && <Puzzle3 solve={() => setSolved('three')} />}
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
    </div>
  );
};

const mapState = (state) => {
  const { puzzles } = state.game;
  return { puzzles };
};

export const HauntedRoom7 = connect(mapState)(_HauntedRoom7);
