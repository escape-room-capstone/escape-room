import React, { useState, useEffect } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { Redirect } from 'react-router-dom';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
// import css
import '../../../public/css/HauntedRoom.css';

export const Success = (props) => {
  const [advance, setAdvance] = useState(false);
  useEffect(() => setTimeout(() => setAdvance(true), 10000), []);
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={100}
          cursorColor="white"
          text="You made it to the next room..blahblah..."
          typeSpeed={100}
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
        <Layer></Layer>
      </Stage>

      {advance ? <Redirect push to="/haunted/room3" /> : ''}
    </div>
  );
};
