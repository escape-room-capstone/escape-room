import React, { useState, useEffect } from 'react';
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

export default function Puzzle1(props) {
  const [puzzle, setPuzzle] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  useEffect(() => {
    if (puzzle.one && puzzle.two && puzzle.three && puzzle.four) {
      props.solve();
    }
  }, [puzzle]);
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
export const Puzzle2 = (props) => {
  return (
    <div>
      THIS IS PuzzleTwo
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};
export const Puzzle3 = (props) => {
  return (
    <div>
      THIS IS PuzzleThree
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};
export const Puzzle4 = (props) => {
  const Hangman = (props) => {
    const [image] = useImage('/Images/gallows.png');
    return <Image image={image} />;
  };
  return (
    <div>
      <Stage
        height={props.display ? 100 : 400}
        align="center"
        width={props.display ? 150 : 1500}
      >
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
const Puzzle5 = (props) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const checkAnswer = () => {
    if (input === 'a') {
      props.solve();
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => checkAnswer()}>SUBMIT</button>
      <div>{error ? 'try again' : ''}</div>
    </div>
  );
};

const Puzzle6 = (props) => {
  {
    const [square, setSquare] = useState({
      one: 0,
      two: 1,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
    });

    let status = 'Ship defenses are currently offline.';
    if (
      parseInt(square.one) === 8 &&
      parseInt(square.three) === 6 &&
      parseInt(square.four) === 3 &&
      parseInt(square.five) === 5 &&
      parseInt(square.six) === 7 &&
      parseInt(square.seven) === 4 &&
      parseInt(square.eight) === 9 &&
      parseInt(square.nine) === 2
    ) {
      status = 'Ship defenses have been restored. You may exit this menu.';
    }

    useEffect(() => {
      if (
        parseInt(square.one) === 8 &&
        parseInt(square.three) === 6 &&
        parseInt(square.four) === 3 &&
        parseInt(square.five) === 5 &&
        parseInt(square.six) === 7 &&
        parseInt(square.seven) === 4 &&
        parseInt(square.eight) === 9 &&
        parseInt(square.nine) === 2
      ) {
        props.solve();
      }
    }, [square]);

    return (
      <>
        <div className="status">{status}</div>
        <div className="grid-container">
          <div className="sq">
            <input
              value={square.one}
              onChange={(e) => setSquare({ ...square, one: e.target.value })}
              type="number"
              name="sqOne"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.two}
              readOnly
              type="number"
              name="sqTwo"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.three}
              onChange={(e) => setSquare({ ...square, three: e.target.value })}
              type="number"
              name="sqThree"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.four}
              onChange={(e) => setSquare({ ...square, four: e.target.value })}
              type="number"
              name="sqFour"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.five}
              onChange={(e) => setSquare({ ...square, five: e.target.value })}
              type="number"
              name="sqFive"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.six}
              onChange={(e) => setSquare({ ...square, six: e.target.value })}
              type="number"
              name="sqSix"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.seven}
              onChange={(e) => setSquare({ ...square, seven: e.target.value })}
              type="number"
              name="sqSeven"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.eight}
              onChange={(e) => setSquare({ ...square, eight: e.target.value })}
              type="number"
              name="sqEight"
              required
            />
          </div>
          <div className="sq">
            <input
              value={square.nine}
              onChange={(e) => setSquare({ ...square, nine: e.target.value })}
              type="number"
              name="sqNine"
              required
            />
          </div>
        </div>
      </>
    );
  }
};

export const componentMapping = {
  Puzzle1,
  Puzzle2,
  Puzzle3,
  Puzzle4,
  Puzzle5,
  Puzzle6,
};
