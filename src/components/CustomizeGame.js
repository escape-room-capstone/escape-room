import React, { useState, useEffect } from 'react';
import { ChoosePuzzleForm } from './ChoosePuzzleForm';
import { connect } from 'react-redux';

import { setPuzzles } from '../reducers/puzzles';
import { fetchGames } from '../reducers/allGames.js';

export const _CustomizeGame = (props) => {
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
  console.log(props.allGames, 'props.games');
  return (
    <div id="customize-game">
      <h2>Create Your Game</h2>
      <h3>Choose A Theme</h3>
      <div>
        {props.puzzles.map((puzzle, idx) => (
          <div key={idx} className="puzzle">
            {puzzle.name}
          </div>
        ))}
      </div>
      {/* <select onChange={(e) => setTheme(e.target.value)}>
        <option value="haunted">The Haunted House</option>
        <option value="bank">Bank Robbery</option>
        <option value="star wars">Star Wars</option>
        <option value="riddlez">House of Riddlez</option>
        <option value="island">The Island</option>
      </select> */}
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

export const CustomizeGame = connect(
  (state) => state,
  mapDispatch
)(_CustomizeGame);
