import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text, Circle, Image, Rect } from 'react-konva';
import { Redirect } from 'react-router-dom';
import useImage from 'use-image';
import { connect } from 'react-redux';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';
import { fetchGame } from '../../store/game.js';

//make images to attach to stage
const HauntedHouse = (props) => {
  const [image] = useImage('/Images/house.jpg');
  return <Image image={image} />;
};

const _HauntedRoom1 = (props) => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const [enterHome, setEnterHome] = useState(false);
  useEffect(() => {
    //hard coded gameId for now for testing purposes
    props.getGame(1);
  }, []);
  return (
    <div className="game-room">
      <div className="narrative intro">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          cursorColor="white"
          text="You spot a house in the distance..."
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
      {enterHome ? <Redirect push to="/haunted/1/room2" /> : ''}
    </div>
  );
};

{
}

const mapDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
  };
};

export const HauntedRoom1 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom1);
