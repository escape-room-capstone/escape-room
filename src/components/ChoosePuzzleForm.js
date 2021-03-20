import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const _ChoosePuzzleForm = (props) => {
  return (
    <div>
      <h2>Choose ${props.game.numPuzzles} puzzles for your game</h2>
      <div>
        {props.puzzles.map((puzzle) => (
          <div>{puzzle.name}</div>
        ))}
      </div>
    </div>
  );
};

export const ChoosePuzzleForm = connect((state) => state)(_ChoosePuzzleForm);
