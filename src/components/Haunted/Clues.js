import React from 'react';
import { Stage, Layer, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';

export const Room5Clue1 = (props) => {
  const Hangman = (props) => {
    const [image] = useImage('/Images/gallows.png');
    return <Image image={image} />;
  };
  return (
    <div>
      <Stage height={400} align="center" width={1500}>
        <Layer>
          <Hangman />

          <Circle
            onDragEnd={(e) => {
              console.log(e.target.x(), 'e.target.x()');
            }}
            x={100}
            y={100}
            draggable={true}
            radius={60}
            fill="red"
          />
          <Circle x={200} y={200} draggable={true} radius={60} fill="yellow" />
          <Circle x={300} y={300} draggable={true} radius={60} fill="blue" />
          <Line
            x={500}
            y={0}
            points={[500, 50, 500, 200]}
            tension={2}
            stroke="red"
          />
        </Layer>
      </Stage>
      <hr></hr>
    </div>
  );
};

export const Room5Clue2 = (props) => {
  return <div>THIS IS PUZZLE TWO</div>;
};

export const Room5Clue3 = (props) => {
  return <div>THIS IS PUZZLE THREE</div>;
};
