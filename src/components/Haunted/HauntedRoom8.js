import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';

//import clue
import { Room8Clue1 } from './Clues';

//react modal
import Modal from 'react-modal';

//import css file
import '../../../public/css/HauntedRoom.css';

//custom modal styles
import { customStyles } from '../../utils/helpers';

//make images to attach to stage
const NightGrass = (props) => {
  const [image] = useImage('/Images/nightgrass2.jpg');
  return <Image image={image} />;
};
const Phone = (props) => {
  const [image] = useImage('/Images/hauntedphone.png');
  return <Image onClick={props.showModal} x={500} y={600} image={image} />;
};

export const HauntedRoom8 = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    first: '',
    middle: '',
    last: '',
  });
  const checkAnswer = () => {
    if (
      phoneNumber.first + phoneNumber.middle + phoneNumber.last ===
      '2032469853'
    ) {
      props.history.push('/haunted/1/room9');
    }
  };
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="You run through the forest and see a road through the grass ahead of you...Something in the grass catches your eye..."
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
      </Modal>
    </div>
  );
};
