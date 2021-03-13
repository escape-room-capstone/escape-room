import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Group, Circle, Image, Text } from 'react-konva';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { HauntedRoom4 } from './HauntedRoom4';
import '../../../public/css/HauntedRoom.css';

const DarkRoom = (props) => {
  const [image] = useImage('/Images/darkroom.jpg');
  return <Image image={image} />;
};
const KeyPad = (props) => {
  const [image] = useImage('/Images/keypad.jpg');
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
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [cirlceVisibility, setCircleVisibility] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  const addNumber = (num) => {
    setEntries((prevEntries) => [...prevEntries, num]);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => setAdvance(true), 1000);
    }
    if (error.length) {
      setTimeout(() => setEntries([]), 1500);
    }
    if (!entries.length) {
      setError('');
    }
    if (entries.length >= 4) {
      if (entries.join('') === '1337') {
        setSuccess(true);
      } else {
        setError('incorrect code');
      }
    }
  }, [entries, error, success]);
  const enterNumber = (x, y) => {
    if (x >= 102 && x <= 159) {
      if (y >= 60 && y <= 133) addNumber(1);
      if (y >= 134 && y <= 191) addNumber(4);
      if (y >= 213 && y <= 265) addNumber(7);
    }
    if (x >= 174 && x <= 227) {
      if (y >= 60 && y <= 133) addNumber(2);
      if (y >= 134 && y <= 191) addNumber(5);
      if (y >= 213 && y <= 265) addNumber(8);
      if (y >= 288 && y <= 340) addNumber(0);
    }
    if (x >= 244 && x <= 297) {
      if (y >= 60 && y <= 133) addNumber(3);
      if (y >= 134 && y <= 191) addNumber(6);
      if (y >= 213 && y <= 265) addNumber(9);
    }
  };
  return (
    <div
      style={{ cursor: 'url(/Images/flashlight.cur),auto' }}
      className="game-room"
    >
      {advance ? (
        <Redirect push to="/Haunted/room4" />
      ) : (
        <>
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
              <DarkRoom />
              <KeyPad
                open={() => setShowModal(true)}
                toggleIlluminate={() => setShowKeyPad(!showKeyPad)}
                show={showKeyPad}
              />

              <Circle
                onMouseOver={() =>
                  setCircleVisibility((prev) => ({ ...prev, one: true }))
                }
                opacity={cirlceVisibility.one ? 1 : 0}
                x={500}
                y={200}
                fill="white"
                radius={30}
              ></Circle>
              <Text x={495} y={190} text="7" flll="red" fontSize={25}></Text>

              <Circle
                onMouseOver={() =>
                  setCircleVisibility((prev) => ({ ...prev, two: true }))
                }
                opacity={cirlceVisibility.two ? 1 : 0}
                x={200}
                y={400}
                fill="white"
                radius={30}
              ></Circle>
              <Text x={195} y={390} text="1" flll="red" fontSize={25}></Text>

              <Circle
                onMouseOver={() =>
                  setCircleVisibility((prev) => ({ ...prev, three: true }))
                }
                opacity={cirlceVisibility.three ? 1 : 0}
                x={1000}
                y={200}
                fill="white"
                radius={30}
              ></Circle>
              <Text x={995} y={190} text="3" flll="red" fontSize={25}></Text>

              <Circle
                onMouseOver={() =>
                  setCircleVisibility((prev) => ({ ...prev, four: true }))
                }
                opacity={cirlceVisibility.four ? 1 : 0}
                x={670}
                y={460}
                fill="white"
                radius={30}
              ></Circle>
              <Text x={665} y={450} text="3" flll="red" fontSize={25}></Text>
            </Layer>
          </Stage>

          <Modal isOpen={showModal}>
            <div className="keypad">
              <img
                onClick={(e) => {
                  enterNumber(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                }}
                src="/Images/keypad.jpg"
              />

              <div className={error ? 'keypad-entry red' : 'keypad-entry'}>
                <p>{entries.join('')}</p>
              </div>
              {error ? <div className="error">{error}</div> : ''}
              {success ? <div className="success">CORRECT</div> : ''}
              <button onClick={() => setShowModal(false)}>CLOSE</button>
            </div>
          </Modal>
        </>
      )}

      {/* {success ? <Redirect push to="/haunted/room4" /> : ''} */}
    </div>
  );
};
