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

const CreateGame = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
  useEffect(() => {
    if (puzzleToShow.length) {
      setShowModal(true);
    }
  }, [puzzleToShow]);
  useEffect(() => {
    props.getTheme(props.match.params.id);
    props.getPuzzles();
  }, []);

  const generatePuzzle = (puzzleName, props) => {
    if (puzzleName !== '') {
      const Component = componentMapping[puzzleName];
      return <Component {...props} />;
    }
  };

  const { puzzles, theme } = props;
  // console.log(puzzles, theme);
  //USING hard-coded user#2 for axios call...
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
        puzzleArray
      );
    }
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
  const handleChange = (e, puzzleId) => {
    if (!puzzleArray.includes(puzzleId)) {
      setPuzzleArray([...puzzleArray, puzzleId]);
    } else {
      setPuzzleArray(puzzleArray.filter((id) => id !== puzzleId));
    }
  };
  console.log(puzzleArray, 'puzzleArray');
  return (
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
                  <button onClick={() => setPuzzleToShow(puzzle.name)}>
                    Try Out
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button className="submit" onClick={() => submitCreateGame()}>
          {' '}
          Submit{' '}
        </button>
        <div>{error}</div>
        <Modal isOpen={showModal}>
          <div>{generatePuzzle(puzzleToShow, props)}</div>
          <button onClick={() => setShowModal(false)}>CLOSE</button>
        </Modal>
      </div>
    </div>
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
      puzzleArray
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
      puzzleArray
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
          history
        )
      ),
  };
};

export default connect(mapState, mapDispatch)(CreateGame);
