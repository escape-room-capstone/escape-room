import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';
import { connect } from 'react-redux';

const Police = (props) => {
  const [image] = useImage('/Images/hauntedpolice.jpg');
  return <Image image={image} />;
};

const _HauntedRoom9 = (props) => {
  // useEffect(() => {
  //   setTimeout(() => props.history.push('/haunted/1/final'), 2000);
  // }, []);
  return (
    <div className="game-room">
      <div className="narrative">
        {/* <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="The police arrive and drive you home. As you dry off from the rain, you think how lucky you were to have escaped"
          typeSpeed={45}
        /> */}
        <p>
          The police arrive and drive you home. As you dry off from the rain,
          you think how lucky you were to have escaped...
        </p>
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
      <div>
        <button
          onClick={() => props.history.push(`/haunted/${props.game.id}/final`)}
        >
          [Dev] next room
        </button>
      </div>
    </div>
  );
};

export const HauntedRoom9 = connect((state) => state)(_HauntedRoom9);
