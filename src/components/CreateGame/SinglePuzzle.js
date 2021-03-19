import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchTheme } from '../../store/singleTheme';
import axios from "axios"
import { setPuzzle } from '../../store/puzzle';
import { componentMapping } from '../Puzzles/puzzles'
import { Puzzle4 } from '../Puzzles/puzzles'



const SinglePuzzle = (props) => {

    

    useEffect(() => {
        props.getPuzzle(props.match.params.id);
      }, []);

      const { puzzle } = props;
    
      const ComponentName = puzzle.name;

  return (
    <div>
    <Puzzle4 />
  </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getPuzzle : setPuzzle
};

export default connect(mapState, mapDispatch)(SinglePuzzle);