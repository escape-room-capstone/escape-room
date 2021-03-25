import React, { useState, useEffect } from 'react';
import { ChoosePuzzleForm } from './ChoosePuzzleForm';
import { connect } from 'react-redux';
import '../../public/CSS/CustomizeGame.css';
import { setPuzzles } from '../store/puzzles';
import { fetchGames } from '../store/allGames.js';
import { createGame } from '../store/game.js';

//hard-coded for now
const userId = 1;
export const _CreateGame = (props) => {
  const [chosenPuzzles, setChosenPuzzles] = useState([]);
  useEffect(() => {
    const fetchPuzzles = async () => {
      await props.fetchPuzzles();
      await props.fetchGames();
    };
    fetchPuzzles();
  }, []);

  console.log(props, 'props');
  console.log(props.puzzles, 'props.puzzles');
  if (!props.game.id) {
    return (
      <div id="customize-game">
        <h2>Create Your Game</h2>
        <h3>Choose One Of Our Themes</h3>
        <div>
          {props.games.map((game, idx) => (
            <div key={idx} className="game">
              {game.title}
              <img height="200" width="250" src={game.imgSrc} />
              <p>{game.description}</p>
              <button
                onClick={() =>
                  props.createGame(
                    userId,
                    game.theme,
                    game.numPuzzles,
                    game.title
                  )
                }
              >
                CUSTOMIZE
              </button>
            </div>
          ))}
        </div>
        <h3>Or</h3> <button>Create Your Own</button>
        {/* {props.game.id ? <ChoosePuzzleForm /> : ''} */}
      </div>
    );
  } else {
    return <ChoosePuzzleForm />;
  }
};
//eventually will need to map user auth to state here as well
const mapState = (state) => {
  //games here will be just the games without a userId associated -- just the default games
  const games = state.allGames.filter((game) => !game.userId);
  const { puzzles, game } = state;
  return { games, game, puzzles };
};
const mapDispatch = (dispatch) => {
  return {
    fetchPuzzles: () => dispatch(setPuzzles()),
    fetchGames: () => dispatch(fetchGames()),
    createGame: (userId, theme, numPuzzles, title) =>
      dispatch(createGame(userId, theme, numPuzzles, title)),
  };
};

export const CreateGame = connect(mapState, mapDispatch)(_CreateGame);
