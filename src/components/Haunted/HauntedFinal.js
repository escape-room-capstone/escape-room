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
      <div className="narrative">
        {/* <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="The police arrive and drive you home. As you dry off from the rain, you think how lucky you were to have escaped"
          typeSpeed={65}
        /> */}
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
          <House />
          <Text
            align="center"
            y={200}
            x={100}
            fontFamily="sans-serif"
            text="THE HAUNTED HOUSE"
            fontSize={90}
            verticalAlign="middle"
            fill="red"
          ></Text>
        </Layer>
      </Stage>
    </div>
  );
};
