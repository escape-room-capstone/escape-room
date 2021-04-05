import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';
import '../../../public/CSS/puzzle.css';

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
        </button>
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
        </button>
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
  const noDisks = 8;

  const minDiskWidth = 25;
  const diskHeight = 20;
  let disksSpace = 3;
  const colors = [
    'Crimson',
    'Orange',
    'MediumPurple',
    'Teal',
    'CornflowerBlue',
    'Chocolate',
    'Salmon',
    'Red',
  ];

  let stacks = [
    { disks: [], x: 150 },
    { disks: [], x: 400 },
    { disks: [], x: 650 },
  ];

  let stacksY = 350;

  let selectedStackNo = 0;
  let moves = 0;
  let finished = false;

  init();

  function loop() {
    clear();

    draw(stacksY);
    drawSelectedDisk();
  }

  function keyPressed() {
    if (key.toUpperCase() === 'R') {
      init();
      return;
    }

    let stackNo = 0;

    // User can select a stack with keys 1, 2 or 3
    if (['1', '2', '3'].includes(key)) stackNo = parseInt(key);

    processUserSelection(stackNo);
  }

  function mouseClicked() {
    // User can select a stack with the mouse
    let stackNo = findStackNoByXY(mouseX, mouseY);

    processUserSelection(stackNo);
  }

  function processUserSelection(stackNo) {
    if (finished) return;

    // If no stack was selected before...
    if (selectedStackNo < 1) {
      let arDisks = getStackDisks(stackNo);

      // ... and if the new selection has disks, then this become the selection
      if (arDisks && arDisks.length > 0) selectedStackNo = stackNo;

      return;
    }

    if (move(selectedStackNo, stackNo)) {
      moves++;

      // Check if the game is finished
      if (isFinished()) {
        finished = true;
        sound('male_congratulations');
      }
    }

    selectedStackNo = 0;
  }

  // Move one disk from a stack to other stack (if possible)
  function move(fromStackNo, toStackNo) {
    let fromStack = getStackDisks(fromStackNo);
    let toStack = getStackDisks(toStackNo);

    if (!fromStack || !toStack) return false;

    if (fromStack === toStack) return false;

    if (fromStack.length === 0) return false;

    let fromDisk = fromStack.peek();
    let toDisk = toStack.peek();

    if (toDisk && fromDisk > toDisk) return false;

    fromStack.pop();
    toStack.push(fromDisk);

    return true;
  }

  // Return the stack disks
  function getStackDisks(stackNo) {
    if (stackNo < 1 || stackNo > stacks.length) return null;

    return stacks[stackNo - 1].disks;
  }

  // Find the stack that contains the point cx, cy (usually the mouse)
  function findStackNoByXY(cx, cy) {
    for (let i = 0; i < stacks.length; i++) {
      let w = noDisks * minDiskWidth;
      let h = noDisks * (diskHeight + disksSpace);
      let x = stacks[i].x - w / 2;
      let y = stacksY - h;

      if (collisionPointRect(cx, cy, x, y, w, h)) return i + 1;
    }

    return 0;
  }

  function init() {
    // Clear all stacks
    for (let stack of stacks) stack.disks.length = 0;

    // Add disks only to the first stack
    for (let i = noDisks; i >= 1; i--) stacks[0].disks.push(i);

    // Reset game variables
    selectedStackNo = 0;
    finished = false;
    moves = 0;
  }

  function draw(y) {
    // Bottom Line
    line(0, y, width, y);

    // Draw stacks
    for (let i = 1; i <= stacks.length; i++) drawStack(i, y);

    drawText();
  }

  function drawStack(stackNo, y) {
    let disks = getStackDisks(stackNo);
    let x = stacks[stackNo - 1].x;
    let selected = stackNo === selectedStackNo;

    // Draw stick
    let stickHeight = diskHeight * noDisks + disksSpace * (noDisks + 1);
    line(x, y - stickHeight, x, y);

    // Draw disks
    for (let i = 0; i < disks.length; i++) {
      let disk = disks[i];
      let diskWidth = disk * minDiskWidth;

      push();
      fill(colors[7 - ((disk - 1) % 8)]);
      noStroke();

      if (selected && i === disks.length - 1) {
        strokeWeight(1);
        stroke('Black');
      }

      rect(
        x - diskWidth / 2,
        y - (i + 1) * diskHeight - disksSpace * (i + 1),
        diskWidth,
        diskHeight
      );
      pop();
    }
  }

  function drawSelectedDisk() {
    let disks = getStackDisks(selectedStackNo);
    if (!disks) return;

    let disk = disks.peek();

    let w = disk * minDiskWidth;

    noFill();
    rect(mouseX - w / 2, mouseY - diskHeight / 2, w, diskHeight);
  }

  function drawText() {
    push();
    noStroke();

    fill('Lavender');
    rect(0, 550, width, 50);

    fill('Black');
    textAlign(CENTER, CENTER);
    textSize(14);
    text(
      'The objective of this game is to move all disks from the left tower to any other tower. However, you can only place a smaller disk on top of a bigger disk. You can play this game using mouse or keyboard (keys 1 to 3 and R to restart).',
      20,
      550,
      760,
      50
    );

    textSize(40);
    text('Tower of Hanoi', 400, 50);

    if (!finished) {
      textSize(20);
      text('Moves: ' + moves, 400, 450);
    } else {
      fill('Navy');
      textSize(14);
      text(
        `Congratulations! You finished the game in ${moves} moves.`,
        400,
        450
      );
      text('Press R to play again.', 400, 480);
    }

    pop();
  }

  function isFinished() {
    return (
      stacks[1].disks.length === noDisks || stacks[2].disks.length === noDisks
    );
  }

  return (
    <div>
      {init()}
      {/* THIS IS PuzzleTwo
      <button onClick={props.solve}>SOLVE</button> */}
    </div>
  );
};

export const Puzzle3 = (props) => {
  const [tiles, setTiles] = useState(shuffle([1, 2, 3, 4, 5, 6, 7, 8, '']));
  const [win, setWin] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [moves, setMoves] = useState([
    [null, 1, 3, null],
    [null, 2, 4, 0],
    [null, null, 5, 1],
    [0, 4, 6, null],
    [1, 5, 7, 3],
    [2, null, 8, 4],
    [3, 7, null, null],
    [4, 8, null, 6],
    [5, null, null, 7],
  ]);

  console.log('tiles', tiles);
  console.log('moves', moves);

  function shuffle(array) {
    let i = 0;
    // switches first two tiles
    function switchTiles(array) {
      // find the first two tiles in a row
      while (!array[i] || !array[i + 1]) i++;

      // store tile value
      let tile = array[i];
      // switche values
      array[i] = array[i + 1];
      array[i + 1] = tile;

      return array;
    }

    // counts inversions
    function countInversions(array) {
      // make array of inversions
      console.log('array inversions');
      const invArray = array.map(function (num, i) {
        let inversions = 0;
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] && array[j] < num) {
            inversions += 1;
          }
        }
        // console.log('inversions', inversions);
        return inversions;
      });
      // return sum of inversions array
      // console.log('reducing');
      return invArray.reduce(function (a, b) {
        return a + b;
      });
    }

    // fischer-yates shuffle algorithm
    function fischerYates(array) {
      let counter = array.length;
      let temp;
      let index;
      console.log('yates');
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      return array;
    }

    // Fischer-Yates shuffle
    array = fischerYates(array);

    // check for even number of inversions
    if (countInversions(array) % 2 !== 0) {
      // switch two tiles if odd
      // console.log('array inversions if statement');
      array = switchTiles(array);
    }

    return array;
  }

  function checkBoard(props) {
    // const tiles = props.tiles;
    console.log('checkBoard');
    for (let i = 0; i < tiles.length - 1; i++) {
      // console.log('checkboard false');
      if (tiles[i] !== i + 1) return false;
    }
    // console.log('checkboard true');
    return true;
  }

  // function handleTileClick() {
  //   tileclick();
  // }

  useEffect(() => {
    if (animate) {
      console.log('USE EFFECT??');
      setTiles(tiles);
      setAnimate(false);
    }
  }, [tiles, setTiles, setAnimate]);

  let tileEl;
  let position;
  let status;
  let move;

  const Tile = (props) => {
    function clickHandler(e) {
      tileClick(e.target, props.position, props.status, props.tiles);
      tileEl = e.target;
      position = props.position;
      status = props.status;
    }

    return (
      <div className="tile" onClick={clickHandler}>
        {props.status}
      </div>
    );
  };

  function tileClick(tileEl, position, status, tiles) {
    console.log('tileClick Tiles', tiles);
    console.log('this is passed in', tileEl, position, status, tiles);
    // Possible moves
    // [up,right,down,left]
    // 9 = out of bounds
    // return if they've already won
    if (win) return;

    console.log('position', position);
    // check possible moves
    for (let i = 0; i < moves[position].length; i++) {
      move = moves[position][i];
      // if an adjacent tile is empty
      if (typeof move === 'number' && !tiles[move]) {
        console.log('if adjacent tile is empty');
        animateTiles(i, move);
        setAnimate(true);
        setTimeout(afterAnimate(), 200);
        break;
      }
    }

    function animateTiles(i, move) {
      const directions = ['up', 'right', 'down', 'left'];
      const moveToEl = document.querySelector(
        '.tile:nth-child(' + (move + 1) + ')'
      );
      let direction = directions[i];
      tileEl.classList.add('move-' + direction);

      // this is all a little hackish.
      // css/js are used together to create the illusion of moving blocks
      setTimeout(function () {
        console.log('moving');
        moveToEl.classList.add('highlight');
        tileEl.classList.remove('move-' + direction);
        // time horribly linked with css transition
        setTimeout(function () {
          console.log('higlight??');
          moveToEl.classList.remove('highlight');
        }, 400);
      }, 200);
      console.log('animate');
    }

    // called after tile is fully moved
    // sets new state
    function afterAnimate() {
      console.log('AFTER ANIMATE move', move);
      tiles[position] = '';
      tiles[move] = status;
      setTiles(tiles);
      setMoves(moves);
      setWin(checkBoard(props));
    }
  }

  function clickHandler() {
    restartGame();
  }

  function restartGame() {
    setTiles(shuffle([1, 2, 3, 4, 5, 6, 7, 8, '']));
    setWin(false);
    setMoves([
      [null, 1, 3, null],
      [null, 2, 4, 0],
      [null, null, 5, 1],
      [0, 4, 6, null],
      [1, 5, 7, 3],
      [2, null, 8, 4],
      [3, 7, null, null],
      [4, 8, null, 6],
      [5, null, null, 7],
    ]);
    setAnimate(false);
  }

  return (
    <div className="puzzleContainer">
      <h1 className="title">ReactJS Slide Puzzle</h1>
      <div id="game-container">
        <div id="game-board">
          {tiles.map((tile, idx) => {
            return (
              <Tile
                status={tile}
                key={idx}
                position={idx}
                tiles={tiles}
                tileClick={tileClick}
              />
            );
          })}
        </div>
        <div id="menu">
          <h3 id="subtitle">{win ? 'You win!' : 'Solve the puzzle.'}</h3>
          <a className={win ? 'button win' : 'button'} onClick={clickHandler}>
            Restart
          </a>
        </div>
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
