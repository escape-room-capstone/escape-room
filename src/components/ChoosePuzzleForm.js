import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { componentMapping } from './Puzzles/puzzles';
import '../../public/CSS/CustomizeGame.css';

const _ChoosePuzzleForm = (props) => {
  //function which dynamically generates a puzzle component based on puzzle name
  const makeComponent = (componentName, props) => {
    const Component = componentMapping[componentName];
    return <Component {...props} />;
  };
  return (
    <div>
      <h2>Choose {props.game.numPuzzles} puzzles for your game</h2>
      <h3>Available Puzzles</h3>
      <div id="puzzle-choices">
        {props.puzzles.map((puzzle, idx) => (
          <div className="puzzle-choice" key={idx}>
            {puzzle.name}
            {makeComponent(puzzle.name)}
          </div>
        ))}
      </div>
      {/* Designed by VARKS */}
    </div>
  );
};

export const ChoosePuzzleForm = connect((state) => state)(_ChoosePuzzleForm);
