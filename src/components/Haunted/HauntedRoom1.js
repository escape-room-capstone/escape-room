import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text, Circle, Image, Rect } from 'react-konva';
import { Redirect } from 'react-router-dom';
import useImage from 'use-image';
import { connect } from 'react-redux';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';
import { fetchGame } from '../../store/game';
import { Burger } from '../Burger';
//make images to attach to stage
const HauntedHouse = (props) => {
  const [image] = useImage('/Images/hauntedhouse2.jpg');
  return <Image image={image} />;
};

const _HauntedRoom1 = (props) => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const [enterHome, setEnterHome] = useState(false);
  useEffect(() => {
    //hard coded gameId for now for testing purposes
    props.getGame(props.match.params.gameId);
  }, []);

  return (
    <div className="game-room">
      <Burger {...props} />
      <div className="narrative">
        <p>
          You spot a house in the distance. You go in...
          {/* <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            cursorColor="white"
            fontSize="2rem"
            text="You spot a house in the distance..."
            typeSpeed={60}
            hideCursorAfterText={true} */}
          {/* /> */}
        </p>
        {/* <div>
          <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            startDelay={3000}
            cursorColor="white"
            text="You go in."
            typeSpeed={80}
            hideCursorAfterText={true}
          />
        </div> */}
      </div>
      <Stage
        onClick={(e) => {
          console.log(e.evt.layerX, 'layerX position');
          console.log(e.evt.layerY), 'layerY position)';
        }}
        height={559}
        align="center"
        width={1000}
      >
        <Layer>
          <HauntedHouse />
          <Circle
            onClick={() => setEnterHome(true)}
            x={545}
            y={450}
            radius={35}
            fill={buttonSelected ? '#66ff00' : 'white'}
            onMouseEnter={() => setButtonSelected(true)}
            onMouseLeave={() => setButtonSelected(false)}
          />
          <Text
            onClick={() => setEnterHome(true)}
            onMouseEnter={() => setButtonSelected(true)}
            x={520}
            y={445}
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
    saveTimer: (userId, gameId, time) =>
      dispatch(updateTimer(userId, gameId, time)),
  };
};

export const HauntedRoom1 = connect(
  (state) => state,
  mapDispatch
)(_HauntedRoom1);
