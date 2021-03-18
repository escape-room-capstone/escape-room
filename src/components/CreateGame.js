import React, { useState, useEffect } from 'react';
import { ChoosePuzzleForm } from './ChoosePuzzleForm';
//should the themes in the dropdown be iterated over instead of hard-coded?
//could fetch the themes from..DB? if there is a theme model
export const CreateGame = (props) => {
  const [puzzles, setPuzzles] = useState([]);
  const [theme, setTheme] = useState('');
  return (
    <div id="customize-game">
      <h2>Create Your Game</h2>
      <h3>Choose A Theme</h3>

      <select onChange={(e) => setTheme(e.target.value)}>
        <option value="haunted">The Haunted House</option>
        <option value="bank">Bank Robbery</option>
        <option value="star wars">Star Wars</option>
        <option value="house">The House</option>
        <option value="island">The Island</option>
      </select>
      {theme ? <ChoosePuzzleForm theme={theme} /> : ''}
    </div>
  );
};
