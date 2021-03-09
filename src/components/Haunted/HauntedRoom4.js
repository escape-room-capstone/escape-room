import React, { useState, useEffect } from 'react';
import useImage from 'use-image';
import TypeWriterEffect from 'react-typewriter-effect';
import { Stage, Layer, Text, Circle, Group, Image } from 'react-konva';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

export const HauntedRoom4 = (props) => {
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text="Room 4"
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
        <Layer></Layer>
      </Stage>
    </div>
  );
};
