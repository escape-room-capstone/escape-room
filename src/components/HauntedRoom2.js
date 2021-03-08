import React, { useState } from 'react';
import '../../public/css/HauntedRoom.css';
import TypeWriterEffect from 'react-typewriter-effect';
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
import useImage from 'use-image';
import '../../public/css/HauntedRoom.css';

//background image
const HauntedHallway = (props) => {
  const [image] = useImage('/spooky-stairs.jpg');
  return <Image image={image} />;
};
// clue image
const Clue = (props) => {
  const [clueImage] = useImage('/question.png');
  const [greenCheck] = useImage('/check.png');
  console.log(typeof props.showClue, 'props.showclue');
  return (
    <Image
      onClick={props.showClue}
      x={props.x}
      y={props.y}
      height={35}
      width={35}
      image={props.solved ? greenCheck : clueImage}
    />
  );
};

export const HauntedRoom2 = (props) => {
  const roomClues = {
    one: { solved: false, show: false },
    two: { solved: false, show: false },
    three: { solved: false, show: false },
  };
  const [clues, setClues] = useState(roomClues); //an array of clue info
  //   const [clue1, setClue1] = useState({ show: false, solved: false });
  return (
    <div className="game-room">
      <div className="narrative">
        <TypeWriterEffect
          textStyle={{ fontFamily: 'Red Hat Display' }}
          startDelay={100}
          cursorColor="white"
          text="Not sure why you thought this was a good idea..."
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
        <Layer>
          <HauntedHallway />
          <Clue
            showClue={() =>
              setClues((prevClues) => {
                return { ...prevClues, one: { show: true, solved: false } };
              })
            }
            solved={clues.one.solved}
            name="one"
            x={625}
            y={470}
          />
          <Clue
            showClue={() =>
              setClues((prevClues) => {
                return { ...prevClues, two: { show: true, solved: false } };
              })
            }
            solved={clues.two.solved}
            x={870}
            y={420}
          />
          <Clue
            showClue={() =>
              setClues((prevClues) => {
                return { ...prevClues, three: { show: true, solved: false } };
              })
            }
            solved={clues.three.solved}
            x={750}
            y={275}
          />
        </Layer>
      </Stage>
      {clues.one.show ? <div>show clue one</div> : ''}
      {clues.two.show ? <div>show clue two</div> : ''}
      {clues.three.show ? <div>show clue three</div> : ''}
    </div>
  );
};
