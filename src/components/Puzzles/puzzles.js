import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';
import '../../../public/CSS/puzzle.css';
import { Hints } from '../Hints';
import { TilePuzzle } from './tilepuzzle';
import balloon from '../../../public/Images/balloon.png'
import poppedBalloon from '../../../public/Images/balloon-popped.png'
import sun from '../../../public/Images/sun.png'

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
      <button onClick={() => props.solve()}>solve</button>
    </div>
  );
};

export const Puzzle2 = (props) => {
  const myhints = [
    { text: 'here is a really good hint', show: false },
    { text: 'here is another awesome hint', show: false },
  ];
  console.log(props, 'props');
  return (
    <div>
      <Hints puzzlehints={myhints} />
      This Is PuzzleTwo
      <button onClick={props.solve}>SOLVE</button>
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


  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  const [show5, setShow5] = useState(true);
  const [show6, setShow6] = useState(true);
  const [show7, setShow7] = useState(true);
  const [show8, setShow8] = useState(true);
  const [show9, setShow9] = useState(true);
  
  const [guess, setGuess] = useState("");
    
  const myhints = [
    { text: 'The balloons might have something in them...', show: false },
    { text: 'Sun : What is your favorite color my child ? Mine represents royalty and wealth', show: false },
  ];          


  

  const handleChange = (e) => {
    setGuess(e.target.value);    
  }
  return (
    <div className="wrapper" style = {{ backgroundSize: 'cover', background : "url(https://wallpaperaccess.com/full/164679.jpg)" }}>
      <Hints puzzlehints={myhints} />
      <div style={{ alignContent:"center", width:"100%"}}>
      <label>          
          <input
            style={{ filter:"opacity(0.8)", fontWeight:"bold", color:"white", backgroundSize:'cover', backgroundImage: guess === "" ? `url(${sun})` : "", border:"none", backgroundColor:"#1465b0", borderRadius:"60%", height: '250px', width: '250px', marginLeft: '80%' }}
            value={guess}            
            onChange={(e) => handleChange(e)}
            type="text"
          />
        </label>
        <span style={{ fontSize: "30px", fontWeight : "bold", color : guess === "Purple" ? "white" : "black" }}> { guess.toLowerCase() === "hello" ? "Hi, still wrong though." : guess.toLowerCase() === "good morning"  ? "Good Morning! Try again friend !" : guess === "" ? "" : guess === "Purple" ? <button id="createButton" style={{ marginLeft:"40%" }} onClick={props.solve}> Proceed </button> : "INCORRECT"} </span>        
      </div>

    <div className="sliding-background" style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh" }}>
    <img onClick={()=>setShow1(false)} style={{height:"100px"}} src={ show1 ? balloon : poppedBalloon} alt="balloon"></img> 
    {show2 ? <img onClick={()=>setShow2(false)} style={{height:"50px"}} src={balloon} alt="balloon"></img> : <div style={{ borderRadius:"50%", height:"50px", width:"50px", background:"green" }}> </div>  }    
    <img onClick={()=>setShow3(false)} style={{height:"150px"}} src={ show3 ? balloon : poppedBalloon} alt="balloon"></img>
    {show4 ? <img onClick={()=>setShow4(false)} style={{height:"40px"}} src={balloon} alt="balloon"></img> : <div style={{ borderRadius:"50%", height:"50px", width:"50px", background:"black" }}> </div>  }    
    <img onClick={()=>setShow5(false)} style={{height:"120px"}} src={ show5 ? balloon : poppedBalloon} alt="balloon"></img>
    <img onClick={()=>setShow6(false)} style={{height:"100px"}} src={ show6 ? balloon : poppedBalloon} alt="balloon"></img>
    {show7 ? <img onClick={()=>setShow7(false)} style={{height:"80px"}} src={balloon} alt="balloon"></img> : <div style={{ borderRadius:"50%", height:"50px", width:"50px", background:"purple" }}> </div>  }
    <img onClick={()=>setShow8(false)} style={{height:"160px"}} src={ show8 ? balloon : poppedBalloon} alt="balloon"></img>    
    <img onClick={()=>setShow9(false)} style={{height:"120px"}} src={ show9 ? balloon : poppedBalloon} alt="balloon"></img>
      </div>
      
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
  console.log(props, 'props of puzzle14');
  return (
    <div>
      <TilePuzzle solve={props.solve} />{' '}
      {!props.demo ? <button onClick={() => props.solve()}>SOLVE</button> : ''}
    </div>
  );
};

export const Puzzle15 = (props) => {
  return (
    <div>
      THIS IS PUZZLE FIFTEEN
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
