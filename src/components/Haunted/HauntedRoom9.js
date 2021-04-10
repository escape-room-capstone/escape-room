import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';

const Police = (props) => {
  const [image] = useImage('/Images/hauntedpolice.jpg');
  return <Image image={image} />;
};

export const HauntedRoom9 = (props) => {
  useEffect(() => {
    setTimeout(() => props.history.push('/haunted/1/final'), 9000);
  }, []);
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="The police arrive and drive you home. As you dry off from the rain, you think how lucky you were to have escaped"
          typeSpeed={65}
        />
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
          <Police />
        </Layer>
      </Stage>
    </div>
  );
};
