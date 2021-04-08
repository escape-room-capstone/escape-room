import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';

const House = (props) => {
  const [image] = useImage('/Images/hauntedhousefinal.jpg');
  return <Image image={image} />;
};

export const HauntedFinal = (props) => {
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
