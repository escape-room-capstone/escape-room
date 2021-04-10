import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Rect, Text, Circle, Group, Image } from 'react-konva';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import '../../../public/css/HauntedRoom.css';
import { connect } from 'react-redux';
const DoorAjar = (props) => {
  const [image] = useImage('/Images/doorajar.jpg');
  return <Image image={image} />;
};

const _HauntedRoom4 = (props) => {
  const [advance, setAdvance] = useState(false);
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="A door on the opposite side of the room creaks open."
          typeSpeed={50}
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
          <DoorAjar />
          <Rect
            onClick={() => setAdvance(true)}
            onMouseOver={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              // style stage container:
              const container = e.target.getStage().container();
              container.style.cursor = 'default';
            }}
            opacity={0}
            x={730}
            y={65}
            fill="white"
            border="green"
            strokeWidth={1} // border width
            stroke="green" // border color
            height={220}
            width={150}
          />
        </Layer>
      </Stage>
      <div>
        <button
          onClick={() => props.history.push(`/haunted/${props.gameId}/room5`)}
        >
          [Dev] next room
        </button>
      </div>
      {advance ? <Redirect push to="/haunted/1/Room5" /> : ''}
    </div>
  );
};

const mapState = (state, routeProps) => {
  const gameId = routeProps.match.params.gameId * 1;
  return { gameId };
};

export const HauntedRoom4 = connect(mapState)(_HauntedRoom4);
