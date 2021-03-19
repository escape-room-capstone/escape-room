import React, { useState, useEffect } from 'react';
import { ChoosePuzzleForm } from './ChoosePuzzleForm';
import { connect } from 'react-redux';

import { setPuzzles } from '../reducers/puzzles';
import { fetchGames } from '../reducers/allGames.js';

export const _CreateeGame = (props) => {
  const [chosenPuzzles, setChosenPuzzles] = useState([]);
  const [theme, setTheme] = useState('');
  useEffect(() => {
    const fetchPuzzles = async () => {
      await props.fetchPuzzles();
      await props.fetchGames();
    };
    fetchPuzzles();
  }, []);
  console.log(props.puzzles, 'props.puzzles');
  console.log(props.allGames, 'props.allGames');
  return (
    <div id="customize-game">
      <h2>Create Your Game</h2>
      <h3>Choose A Theme</h3>
      <div>
        {props.allGames.map((game, idx) => (
          <div key={idx} className="game">
            {game.title}
            <img height="200" width="250" src={game.imgSrc} />
            <p>{game.description}</p>
            {/* <button onClick={() => props.createGame()}>CUSTOMIZE</button> */}
          </div>
        ))}
      </div>

      {theme ? <ChoosePuzzleForm theme={theme} /> : ''}
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    fetchPuzzles: () => dispatch(setPuzzles()),
    fetchGames: () => dispatch(fetchGames()),
  };
};

export const CreateeGame = connect((state) => state, mapDispatch)(_CreateGame);
