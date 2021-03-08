import React, { useState } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
import { Redirect } from 'react-router-dom';

const GreenDoor = (props) => {
  const [image] = useImage('/greendoor.jpg');
  return <Image image={image} />;
};

export const HauntedRoom3 = (props) => {
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
        </Layer>
      </Stage>
    </div>
  );
};
