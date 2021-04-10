import React, { useState, useEffect } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { Redirect } from 'react-router-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

// import css
import '../../../public/css/HauntedRoom.css';
import { connect } from 'react-redux';

const Doorway = (props) => {
  const [image] = useImage('/Images/darkdoor.jpg');
  return <Image image={image} />;
};
const Success = (props) => {
  // const [advance, setAdvance] = useState(false);
  // useEffect(
  //   () => setTimeout(() => props.history.push('/haunted/1/room3'), 6000),
  //   []
  // );
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={100}
          cursorColor="white"
          text="You run past the ghosts and through an open door at the top of the stairway..."
          typeSpeed={30}
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
          <Doorway />
        </Layer>
      </Stage>
      <div>
        <button
          onClick={() => props.history.push(`/haunted/${props.game.id}/room3`)}
        >
          [Dev] next room
        </button>
      </div>
      {/* {advance ? <Redirect push to="/haunted/room3" /> : ''} */}
    </div>
  );
};

export const HauntedR2Success = connect((state) => state)(Success);
