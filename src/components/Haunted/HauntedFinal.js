import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import '../../../public/css/HauntedRoom.css';
import { connect } from 'react-redux';
import { fetchGame } from '../../store/game';

const House = (props) => {
  const [image] = useImage('/Images/hauntedhousefinal.jpg');
  return <Image image={image} />;
};

const _HauntedFinal = (props) => {
  const { gameId } = props.match.params;

  useEffect(() => {
    async function fetchGame() {
      await props.getGame(gameId);
    }
    fetchGame();
  }, []);
  useEffect(() => {
    const interval = setTimeout(() => {
      props.history.push(`/games/${gameId}/victory`);
    }, 2000);
  }, []);
  return (
    <div className="game-room">
      <div className="narrative"></div>
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
          <House />
          <Text
            align="center"
            y={200}
            x={100}
            fontFamily="sans-serif"
            text="THE HAUNTED HOUSE"
            fontSize={70}
            verticalAlign="middle"
            fill="red"
          ></Text>
        </Layer>
      </Stage>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    getGame: (gameId) => dispatch(fetchGame(gameId)),
  };
};
export const HauntedFinal = connect(
  (state) => state,
  mapDispatch
)(_HauntedFinal);
