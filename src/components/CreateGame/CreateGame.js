import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTheme } from '../../store/singleTheme';
import axios from 'axios';
import { fetchUserGame } from '../../store/game';
import Modal from 'react-modal';
import { setPuzzles } from '../../store/puzzles';
import { componentMapping } from '../Puzzles/puzzles';
import '../../../public/css/CreateGame.css';
import { createGame } from '../../store/game';
import { createCustomGame } from '../../store/customGame';
import { Navbar } from '../Navbar';

const CreateGame = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  //need a public/private variable to pass in when game is created as well
  const [puzzleArray, setPuzzleArray] = useState([]);
  const [error, setError] = useState('');
  // console.log('THIS COMPONENT PROPS', props);
  // const [modal, setModal] = useState({
  //   puzzleToShow: '',
  //   showModal: false,
  // });
  const [puzzleToShow, setPuzzleToShow] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    props.getTheme(props.match.params.id);
    props.getPuzzles();
  }, []);
  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 1500);
    }
  }, [success]);
  const generatePuzzle = (puzzleName, props) => {
    if (puzzleName !== '') {
      const Component = componentMapping[puzzleName];
      return (
        <Component demo={true} solve={() => setSuccess(true)} {...props} />
      );
    }
  };

  const { puzzles, theme } = props;
  // console.log(puzzles, theme);
  const submitCreateGame = async () => {
    const numPuzzles = puzzleArray.length;
    const difference = theme.numPuzzles - numPuzzles;
    //I decided that a room should have ATLEAST 1 puzzle, otherwise what's the point of a room...
    //Each ROOM will have an IMAGE. for example Forest theme has 4 images, therefore 4 rooms.
    //I will check to see if puzzleArray has a minimum of the amount of ROOMS we have. theme.images.length will be the amount of IMAGES we have, which
    //is also the amount of ROOMS we have.
    if (puzzleArray.length < theme.images.length) {
      setError(`Please select at least ${theme.images.length} puzzles.`);
      // } else if (theme.type === 'custom') {
    } else {
      props.makeCustomGame(
        props.auth.id,
        theme.name,
        theme.id,
        theme.numPuzzles,
        title,
        description,
        puzzleArray,
        timer
      );
    }
    // COMMENT -- this was removed, brought it back (commented out) in case something breaks
    // } else if (difference > 0) {
    //   setError(`Please choose ${difference} more puzzles`);
    // } else if (difference < 0) {
    //   setError(
    //     `Oops - too many puzzles. Please remove ${Math.abs(
    //       difference
    //     )} puzzles from your list`
    //   );
    // }

    // } else if (difference === 0 && theme.type === 'default') {
    //   // console.log(puzzleArray, title, numPuzzles, theme.name);
    //   //just send themeId - can find theme on back end?
    //   props.makeGame(
    //     props.auth.id,
    //     theme.name,
    //     theme.id,
    //     theme.numPuzzles,
    //     title,
    //     description,
    //     puzzleArray,
    //     timer
    //   );
    // }
  };

  // const handleChange = (e, puzzleId) => {
  //   // console.log('we are here');
  //   if (e.target.checked) {
  //     setPuzzleArray([...puzzleArray, puzzleId]);
  //   } else if (!e.target.checked) {
  //     const index = puzzleArray.indexOf(puzzleId);

  //     if (index > -1) {
  //       setPuzzleArray(puzzleArray.filter((id) => id !== puzzleId));
  //     }
  //   }
  // };

  // Convert timer inputs into seconds for use in the Game model
  const convertAndSetTime = (e) => {
    var prevTime; // grabs time from props and will consolidate updated time from passed values
    timer ? (prevTime = timer) : (prevTime = 0); // on first render time in props will be undefined
    // define mintues and seconds currently in props
    let minutes = Math.floor(prevTime / 60);
    let seconds = prevTime - minutes * 60;
    // assingn new values to minutes and seconds from input
    if (e.target.name === 'seconds') {
      seconds = e.target.value * 1;
    }
    if (e.target.name === 'minutes') {
      minutes = e.target.value * 1;
    }
    // set new time in props
    setTimer(minutes * 60 + seconds);
  };

  const handleChange = (e, puzzleId) => {
    if (!puzzleArray.includes(puzzleId)) {
      setPuzzleArray([...puzzleArray, puzzleId]);
    } else {
      setPuzzleArray(puzzleArray.filter((id) => id !== puzzleId));
    }
  };

  return (
    <>
      <Navbar />

      <div id="create-game">
        <h1 style={{ color: '#e6e6e6' }}> Theme : {theme.name} </h1>
        <div>
          <label>
            Title of game :
            <input
              style={{ width: '200px', marginLeft: '10px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </label>
          <label>
            Description :
            <input
              style={{ width: '200px', marginLeft: '10px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            Set initial timer for the game :
            <input
              name="minutes"
              min={0}
              value={Math.floor(timer / 60)}
              style={{ width: '50px', marginLeft: '10px' }}
              onChange={(e) => convertAndSetTime(e)}
              type="number"
            />
            minute(s)
            <input
              name="seconds"
              min={0}
              value={timer - Math.floor(timer / 60) * 60}
              style={{ width: '50px', marginLeft: '10px' }}
              onChange={(e) => convertAndSetTime(e)}
              type="number"
            />
            second(s)
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3>Select all the puzzles you would like in your game...</h3>

          <div id="create-game">
            <h1 style={{ color: '#e6e6e6' }}> Theme : {theme.name} </h1>
            <div>
              <label>
                Title of game :
                <input
                  style={{ width: '200px', marginLeft: '10px' }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </label>
              <label>
                Description :
                <input
                  style={{ width: '200px', marginLeft: '10px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </label>
            </div>
            <div>
              <label>
                Set initial timer for the game :
                <input
                  name="minutes"
                  value={Math.floor(timer / 60)}
                  style={{ width: '50px', marginLeft: '10px' }}
                  onChange={(e) => convertAndSetTime(e)}
                  type="number"
                />
                minute(s)
                <input
                  name="seconds"
                  value={timer - Math.floor(timer / 60) * 60}
                  style={{ width: '50px', marginLeft: '10px' }}
                  onChange={(e) => convertAndSetTime(e)}
                  type="number"
                />
                second(s)
              </label>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3>Select all the puzzles you would like in your game...</h3>

              <div className="puzzlesContainer">
                {puzzles.map((puzzle, idx) => {
                  // const Component = componentMapping[puzzle.name];
                  return (
                    <div
                      onClick={(e) => handleChange(e, puzzle.id)}
                      key={puzzle.id}
                      className={`puzzle ${
                        puzzleArray.includes(puzzle.id) ? 'selected' : ''
                      }`}
                    >
                      {/* puzzle.nickname instead, like "Magic Squares, etc"  ???*/}
                      <div>
                        <h3 className="puzzle-name">{puzzle.name}</h3>
                        <button
                          onClick={() => {
                            setPuzzleToShow(puzzle.name);
                            setShowModal(true);
                          }}
                        >
                          Try Out
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                color: 'red',
                fontSize: '1.5rem',
                margin: '1rem auto 2rem auto',
              }}
            >
              {error}
            </div>

            <button className="submit" onClick={() => submitCreateGame()}>
              {' '}
              Submit{' '}
            </button>
            <Modal isOpen={showModal}>
              <div>
                <div>{generatePuzzle(puzzleToShow, props)}</div>
                <div>{success ? 'Nice work!' : ''}</div>
              </div>
              <button onClick={() => setShowModal(false)}>CLOSE</button>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state) => state;

const mapDispatch = (dispatch, { history }) => {
  return {
    getTheme: (themeId) => dispatch(fetchTheme(themeId)),
    getPuzzles: () => dispatch(setPuzzles()),
    makeGame: (
      gameId,
      theme,
      themeId,
      numPuzzles,
      title,
      description,
      puzzleArray,
      timer
    ) =>
      dispatch(
        createGame(
          gameId,
          theme,
          themeId,
          numPuzzles,
          title,
          description,
          puzzleArray,
          timer,
          history
        )
      ),
    makeCustomGame: (
      gameId,
      theme,
      themeId,
      numPuzzles,
      title,
      description,
      puzzleArray,
      timer
    ) =>
      dispatch(
        createCustomGame(
          gameId,
          theme,
          themeId,
          numPuzzles,
          title,
          description,
          puzzleArray,
          timer,
          history
        )
      ),
  };
};

export default connect(mapState, mapDispatch)(CreateGame);
