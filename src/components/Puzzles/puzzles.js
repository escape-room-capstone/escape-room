import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';
import '../../../public/CSS/puzzle.css';
import { Hints } from '../Hints';

export const Puzzle1 = (props) => {
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
};

export const Puzzle2 = (props) => {
  const myhints = [
    { text: 'here is a really good hint', show: false },
    { text: 'here is another awesome hint', show: false },
  ];
  return (
    <div>
      <Hints puzzlehints={myhints} />
      This Is PuzzleTwo
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle3 = (props) => {
  // select the list items
  let ul = document.querySelectorAll('li');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];

  const state = {};
  state.content = letters;

  // shuffle the array
  const shuffle = (arr) => {
    const copy = [...arr];
    // loop over half or full of the array
    for (let i = 0; i < copy.length; i++) {
      // for each index,i pick a random index j
      let j = parseInt(Math.random() * copy.length);
      // swap elements at i and j
      let temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  };

  const isSolvable = (arr) => {
    let number_of_inv = 0;
    // get the number of inversions
    for (let i = 0; i < arr.length; i++) {
      // i picks the first element
      for (let j = i + 1; j < arr.length; j++) {
        // check that an element exist and index i and j, then check that element at i > at j
        if (arr[i] && arr[j] && arr[i] > arr[j]) number_of_inv++;
      }
    }
    // if the number of inversions is even
    // the puzzle is solvable
    return number_of_inv % 2 == 0;
  };

  const fillGrid = (items, letters) => {
    let shuffled = shuffle(letters);
    // shuffle the letters arraay until there is a combination that is solvable
    while (!isSolvable(shuffled)) {
      shuffled = shuffle(letters);
    }

    items.forEach((item, i) => {
      item.innerText = shuffled[i];
    });
  };

  // this function sets a unique id for each list item, in the form 'li0' to 'li8'
  const setId = (items) => {
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute('id', `li${i}`);
    }
  };

  function setUp() {
    fillGrid(ul, letters);
    setId(ul);

    state.content = getState(ul);
    state.dimension = getDimension(state);
    // set up the droppable and dragabble contents
    setDroppable(ul);
    setDraggable(ul);

    console.log('The state content', state.content);
    console.log('The state dimension', state.dimension);
  }

  /**
   * Getters
   */
  const getState = (items) => {
    const content = [];
    items.forEach((item, i) => {
      content.push(item.innerText);
    });
    return content;
  };

  const getEmptyCell = () => {
    const emptyCellNumber = state.emptyCellIndex + 1;
    const emptyCellRow = Math.ceil(emptyCellNumber / 3);
    const emptyCellCol = 3 - (3 * emptyCellRow - emptyCellNumber);
    // emptyCellRow holds the actual row number the empty tile falls into in a 9-cell grid
    // the array index will be one less than its value. Same goes for emptyCellCol
    return [emptyCellRow - 1, emptyCellCol - 1];
  };

  const getDimension = (state) => {
    let j = 0;
    let arr = [];
    const { content } = state;
    for (let i = 0; i < 3; i++) {
      arr.push(content.slice(j, j + 3));
      j += 3;
    }

    return arr;
  };

  /**
   * setters
   */
  const setDroppable = (items) => {
    items.forEach((item, i) => {
      if (!item.innerText) {
        state.emptyCellIndex = i;
        item.setAttribute('ondrop', drop_handler(ev));
        item.setAttribute('ondragover', dragover_handler(ev));
        item.setAttribute('class', 'empty');
        item.setAttribute('draggable', false);
        item.setAttribute('ondragstart', '');
        item.setAttribute('ondragend', '');
      }
      return;
    });
  };

  const removeDroppable = (items) => {
    items.forEach((item) => {
      item.setAttribute('ondrop', '');
      item.setAttribute('ondragover', '');
      item.setAttribute('draggable', false);
      item.setAttribute('ondragstart', '');
      item.setAttribute('ondragend', '');
    });
  };

  const setDraggable = (items) => {
    const [row, col] = getEmptyCell();

    let left,
      right,
      top,
      bottom = null;
    if (state.dimension[row][col - 1]) left = state.dimension[row][col - 1];
    if (state.dimension[row][col + 1]) right = state.dimension[row][col + 1];

    if (state.dimension[row - 1] != undefined)
      top = state.dimension[row - 1][col];
    if (state.dimension[row + 1] != undefined)
      bottom = state.dimension[row + 1][col];

    // make its right and left dragabble
    items.forEach((item) => {
      if (
        item.innerText == top ||
        item.innerText == bottom ||
        item.innerText == right ||
        item.innerText == left
      ) {
        item.setAttribute('draggable', true);
        item.setAttribute('ondragstart', dragstart_handler(ev));
        item.setAttribute('ondragend', dragend_handler(ev));
      }
    });
  };

  const isCorrect = (solution, content) => {
    if (JSON.stringify(solution) == JSON.stringify(content)) return true;
    return false;
  };

  /**
   * Drag and drop handlers
   */
  const dragstart_handler = (ev) => {
    console.log('dragstart');
    ev.dataTransfer.setData('text/plain', ev.target.id);
    ev.dataTransfer.dropEffect = 'move';
  };

  const dragover_handler = (ev) => {
    console.log('dragOver');
    ev.preventDefault();
  };

  const drop_handler = (ev) => {
    console.log('drag');
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData('text/plain');
    ev.target.innerText = document.getElementById(data).innerText;

    // once dropped, unempty the cell :)
    ev.target.classList.remove('empty');
    ev.target.setAttribute('ondrop', '');
    ev.target.setAttribute('ondragover', '');
    document.getElementById(data).innerText = '';

    // get new state
    state.content = getState(ul);
    // get new dimention from the state
    state.dimension = getDimension(state);
  };

  const dragend_handler = (ev) => {
    console.log('dragEnd');
    // Remove all of the drag data
    ev.dataTransfer.clearData();
    // remove all droppable attributes
    removeDroppable(document.querySelectorAll('li'));

    // set new droppable and draggable attributes
    setDroppable(document.querySelectorAll('li'));
    setDraggable(document.querySelectorAll('li'));

    // if correct
    if (isCorrect(letters, state.content)) {
      showModal();
    }
  };

  const showModal = () => {
    document.getElementById('message').innerText = 'You Won!';
    document.getElementById('modal').classList.remove('hide');
  };

  const hideModal = () => {
    document.getElementById('modal').classList.add('hide');
  };

  return (
    <div
      className="wrapper"
      onLoad={() => {
        setUp();
      }}
    >
      <div id="divBody">
        <h1 id="puzzleH1">Sliding Tile Puzzle</h1>
        <div id="modal" className="hide">
          <div id="header">
            <button
              id="closeBtn"
              onClick={() => {
                hideModal;
              }}
            >
              x
            </button>
          </div>
          <h1 id="message">You won!</h1>
        </div>
        <div id="puzzleContainer">
          <ul className="puzzleUL">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <button onClick={props.solve}>SOLVE</button>
      </div>
    </div>
  );
};

export const Puzzle4 = (props) => {
  const Hangman = (props) => {
    const [image] = useImage('/Images/gallows.png');
    return <Image image={image} />;
  };
  return (
    <div className="hangmanContainer">
      <Stage height={100} align="center" width={200}>
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
      {/* <hr></hr> */}
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle5 = (props) => {
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

export const Puzzle6 = (props) => {
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
          <button onClick={props.solve}>SOLVE</button>
        </div>
      </>
    );
  }
};

export const Puzzle7 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 7<button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle8 = (props) => {
  return (
    <div>
      THIS IS PUZZLE EIGHT
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle9 = (props) => {
  return (
    <div>
      THIS IS PUZZLE NINE
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle10 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 10
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle11 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 11
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle12 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 12
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle13 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 13
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle14 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 14
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const Puzzle15 = (props) => {
  return (
    <div>
      THIS IS PUZZLE 15
      <button onClick={props.solve}>SOLVE</button>
    </div>
  );
};

export const componentMapping = {
  Puzzle1,
  Puzzle2,
  Puzzle3,
  Puzzle4,
  Puzzle5,
  Puzzle6,
  Puzzle7,
  Puzzle8,
  Puzzle9,
  Puzzle10,
  Puzzle11,
  Puzzle12,
  Puzzle13,
  Puzzle14,
  Puzzle15,
};
