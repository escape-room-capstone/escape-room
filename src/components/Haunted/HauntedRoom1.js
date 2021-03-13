import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Star, Text, Circle, Image, Rect } from 'react-konva';
import { Redirect, Link } from 'react-router-dom';
import useImage from 'use-image';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';

//make images to attach to stage
const HauntedHouse = (props) => {
  const [image] = useImage('/Images/house.jpg');
  return <Image image={image} />;
};

export const HauntedRoom1 = (props) => {
  console.log(props.history, 'props.history');
  const [buttonSelected, setButtonSelected] = useState(false);
  const [enterHome, setEnterHome] = useState(false);
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          cursorColor="white"
          text="You spot a boarded up house across a small bridge."
          typeSpeed={80}
          hideCursorAfterText={true}
        />
        <div>
          <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            startDelay={5000}
            cursorColor="white"
            text="You go in."
            typeSpeed={80}
            hideCursorAfterText={true}
          />
        </div>
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
          <HauntedHouse />
          <Circle
            onClick={() => setEnterHome(true)}
            x={810}
            y={575}
            radius={35}
            fill={buttonSelected ? '#66ff00' : 'white'}
            onMouseEnter={() => setButtonSelected(true)}
            onMouseLeave={() => setButtonSelected(false)}
          />
          <Text
            onClick={() => setEnterHome(true)}
            onMouseEnter={() => setButtonSelected(true)}
            x={785}
            y={570}
            fontSize={15}
            text="ENTER"
            fill="black"
          ></Text>
        </Layer>
      </Stage>
      {enterHome ? <Redirect push to="/haunted/room2" /> : ''}
    </div>
  );
};

{
  /* <Portal>
          <div>
            <button
              onClick={() => setEnterHome(true)}
              id="house"
              onMouseEnter={() => setButtonSelected(true)}
              onMouseLeave={() => setButtonSelected(false)}
              className={buttonSelected ? 'selected' : 'house'}
            >
              <strong> ENTER</strong>
            </button>
          </div>
        </Portal> */
}
