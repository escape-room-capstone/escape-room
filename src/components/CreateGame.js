import React, { useState, useEffect } from 'react';
import { ChoosePuzzleForm } from './ChoosePuzzleForm';
import { connect } from 'react-redux';
import '../../public/CSS/CustomizeGame.css';
import { setPuzzles } from '../store/puzzles';
import { fetchGames } from '../store/allGames.js';

export const _CreateGame = (props) => {
  const [chosenPuzzles, setChosenPuzzles] = useState([]);
  const [theme, setTheme] = useState('');
  useEffect(() => {
    const fetchPuzzles = async () => {
      await props.fetchPuzzles();
      await props.fetchGames();
    };
    fetchPuzzles();
  }, []);
  console.log(props, 'props');
  console.log(props.puzzles, 'props.puzzles');
  console.log(props.allGames, 'props.allGames');
  return (
    <div id="customize-game">
      <h2>Create Your Game</h2>
      <h3>Choose One Of Ours Themes</h3>
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
      <h3>Or</h3> <button>Create Your Own</button>
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

export const CreateGame = connect((state) => state, mapDispatch)(_CreateGame);
