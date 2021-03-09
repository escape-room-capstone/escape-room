import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
import { Redirect } from 'react-router-dom';

const RainScene = (props) => {
  const [image] = useImage('/Images/thunder.jpg');
  return <Image image={image} />;
};

export const HauntedIntro = (props) => {
  const [advance, setAdvance] = useState(false);
  useEffect(() => setTimeout(() => setAdvance(true), 8000), []);
  return (
    <div className="game-room">
      <div className="narrative intro">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
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
      {advance && <Redirect to="/haunted/room1" />}
    </div>
  );
};
