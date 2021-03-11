import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Stage,
  Layer,
  Star,
  Text,
  Circle,
  Group,
  Image,
  Rect,
} from 'react-konva';
import Konva from 'konva';
import { Redirect, Link } from 'react-router-dom';
import { Portal } from './Portal';
import useImage from 'use-image';
import '../../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';

export const HauntedRoom5 = (props) => {
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={50}
          hideCursorAfterText={true}
          cursorColor="white"
          text=""
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
          <DoorAjar />
        </Layer>
      </Stage>
    </div>
  );
};
