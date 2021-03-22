import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { fetchGame } from '../../store/game.js';

const RainScene = (props) => {
  const [image] = useImage('/Images/thunder.jpg');
  return <Image image={image} />;
};

export const _HauntedIntro = (props) => {
  console.log(props.gameId, 'props.gameid');
  useEffect(() => {
    //hard coded gameId for now for testing purposes
    props.getGame(props.gameId);
  }, []);
  useEffect(
    () => setTimeout(() => props.history.push('/haunted/room1'), 9000),
    []
  );
  return (
    <div className="game-room">
      <div className="narrative intro">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="Driving home in a storm, your car breaks down. You leave your car to look for shelter..."
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
          <RainScene />
        </Layer>
      </Stage>
    </div>
  );
};

const mapState = (state, routeProps) => {
  const gameId = routeProps.match.params.gameId * 1;
  return { gameId };
};

const mapDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
  };
};

export const HauntedIntro = connect(mapState, mapDispatch)(_HauntedIntro);
