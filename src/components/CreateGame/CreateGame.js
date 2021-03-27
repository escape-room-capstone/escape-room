import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTheme } from '../../store/singleTheme';
import axios from 'axios';
import { fetchUserGame } from '../../store/game';
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

  useEffect(() => {
    props.getTheme(props.match.params.id);
    props.getPuzzles();
  }, []);

  const { puzzles, theme } = props;
  console.log(puzzles, theme);
  //USING hard-coded user#2 for axios call...
  const submitCreateGame = async () => {
    const numPuzzles = puzzleArray.length;
    const difference = theme.numPuzzles - numPuzzles;

    if (difference > 0) {
      setError(`Please choose ${difference} more puzzles`);
    }
    if (difference < 0) {
      setError(
        `Oops - too many puzzles. Please remove ${Math.abs(
          difference
        )} puzzles from your list`
      );
    }
    if (difference === 0 && theme.type === 'default') {
      // console.log(puzzleArray, title, numPuzzles, theme.name);
      //just send themeId - can find theme on back end?
      props.makeGame(
        2,
        theme.name,
        theme.id,
        theme.numPuzzles,
        title,
        description,
        puzzleArray
      );
    } else if (difference === 0 && theme.type === 'custom') {
      props.makeCustomGame(
        2,
        theme.name,
        theme.id,
        theme.numPuzzles,
        title,
        description,
        puzzleArray
      );
    }
    //We are only creating the game above... need a gameId..
    //find all the games associated to this user... : this returns an array of all this users games...
    //2 is userId, for now hard-coded...
    // let game = (await axios.get('/api/users/2/games')).data;

    //set game equal to the most recently created game...
    // game = game[game.length - 1];

    // props.history.push(`/gameintro/${game.id}`);
  };

  const handleChange = (e, puzzleId) => {
    console.log('we are here');
    if (e.target.checked) {
      setPuzzleArray([...puzzleArray, puzzleId]);
    } else if (!e.target.checked) {
      const index = puzzleArray.indexOf(puzzleId);

      if (index > -1) {
        setPuzzleArray(puzzleArray.filter((id) => id !== puzzleId));
      }
    }
  };

  return (
    <div>
      <h1> Theme : {theme.name} </h1>
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
      <div className="puzzlesContainer">
        Select all the puzzles you would like in your game...
        <hr />
        {puzzles.map((puzzle, idx) => {
          const Component = componentMapping[puzzle.name];
          return (
            <div key={puzzle.id} className="puzzle">
              {/* puzzle.nickname instead, like "Magic Squares, etc"  ???*/}
              <h1>{puzzle.name}</h1>
              <label> Add Puzzle </label>
              <input
                onChange={(e) => handleChange(e, puzzle.id)}
                type="checkbox"
              />
              <hr />
              <button
                style={{ marginBottom: '10px' }}
                onClick={() => props.history.push(`/puzzle/${puzzle.id}`)}
              >
                {' '}
                Details{' '}
              </button>
              <Component />
              <hr />
            </div>
          );
        })}
      </div>
      <button onClick={() => submitCreateGame()}> Submit </button>
      <div>{error}</div>
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
