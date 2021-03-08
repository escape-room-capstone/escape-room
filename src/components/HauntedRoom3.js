import React, { useState } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

const GreenDoor = (props) => {
  const [image] = useImage('/darkroom.jpg');
  return <Image image={image} />;
};
const KeyPad = (props) => {
  const [image] = useImage('/keypad.jpg');
  return (
    <Image
      onClick={props.open}
      onMouseEnter={props.toggleIlluminate}
      onMouseLeave={props.toggleIlluminate}
      opacity={props.show ? 1 : 0}
      x={90}
      y={190}
      height={120}
      width={100}
      image={image}
    />
  );
};
export const HauntedRoom3 = (props) => {
  const [showKeyPad, setShowKeyPad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="game-room">
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
          <GreenDoor />
          <KeyPad
            open={() => setShowModal(true)}
            toggleIlluminate={() => setShowKeyPad(!showKeyPad)}
            show={showKeyPad}
          />
        </Layer>
      </Stage>
      <Modal isOpen={showModal}>
        <p>enter the right code...</p>
        <img src="/keypad.jpg" />
        <button onClick={() => setShowModal(false)}>CLOSE</button>
      </Modal>
    </div>
  );
};
