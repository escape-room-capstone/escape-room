import React, { useState } from 'react';
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
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Room5Clue2 = (props) => {
  return (
    <div>
      THIS IS PUZZLE TWO
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Room5Clue3 = (props) => {
  return (
    <div>
      THIS IS PUZZLE THREE
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Room7Clue1 = (props) => {
  return (
    <div>
      THIS IS PUZZLE ONE
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Room7Clue2 = (props) => {
  return (
    <div>
      THIS IS PUZZLE TWO
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Room7Clue3 = (props) => {
  return (
    <div>
      THIS IS PUZZLE THREE
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Room8Clue1 = (props) => {
  return (
    <div className="phone-number">
      <img src="/Images/phoneinhand.png" />
      <p>Enter Phone Number To Call For Help</p>

      <input
        name="first"
        onChange={props.handleChange}
        className="small"
        type="text"
        placeholder="xxx"
      ></input>
      <span>-</span>
      <input
        name="middle"
        onChange={props.handleChange}
        className="small"
        type="text"
        placeholder="xxxx"
      ></input>
      <span>-</span>
      <input
        name="last"
        onChange={props.handleChange}
        type="text"
        placeholder="xxxx"
      />
      <br></br>
      <button onClick={props.checkAnswer}>DIAL</button>
    </div>
  );
};

export default function PuzzleOne() {
  const [puzzle, setPuzzle] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  console.log(puzzle);
  return (
    <div>
      <div>
        <button
          onClick={() =>
            setPuzzle({ ...puzzle, one: !puzzle.one, two: !puzzle.two })
          }
        >
          Lever 1
        </button>{' '}
        {puzzle.one === false ? 'False' : 'True'}
      </div>
      <div>
        <button
          onClick={() =>
            setPuzzle({
              ...puzzle,
              two: !puzzle.two,
              three: !puzzle.three,
              four: !puzzle.four,
            })
          }
        >
          Lever 2
        </button>{' '}
        {puzzle.two === false ? 'False' : 'True'}
      </div>
      <div>
        <button
          onClick={() =>
            setPuzzle({
              ...puzzle,
              one: !puzzle.one,
              two: !puzzle.two,
              four: !puzzle.four,
            })
          }
        >
          Lever 3
        </button>{' '}
        {puzzle.three === false ? 'False' : 'True'}
      </div>
      <div>
        <button onClick={() => setPuzzle({ ...puzzle, one: !puzzle.one })}>
          Lever 4
        </button>{' '}
        {puzzle.four === false ? 'False' : 'True'}
      </div>
    </div>
  );
}

export const componentMapping = {
  PuzzleOne,
};
