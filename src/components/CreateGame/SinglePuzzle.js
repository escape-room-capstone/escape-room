import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchTheme } from '../../store/singleTheme';
import axios from "axios"
import { setPuzzle } from '../../store/puzzle';
import { componentMapping } from '../Puzzles/puzzles'
import { render } from 'react-dom';



const SinglePuzzle = (props) => {

    

    useEffect(() => {
        props.getPuzzle(props.match.params.id);
      }, []);

      
      const { puzzle } = props;
      console.log(puzzle);

      const Component = componentMapping[puzzle.name];
    

    // const MyComponents = {
    //     PuzzlePicker : function PuzzlePicker(puzzle){
    //         return `<Puzzle${puzzle.id} />`
    //     }
    // }
    // console.log(MyComponents.PuzzlePicker());

  return (
    <div>
    {puzzle.id ?
     <div>
       <h2> {puzzle.name} </h2>
       <p> INFORMATION ON THE PUZZLE, SOLUTION, PROMPTS, ETC, will add all that information to the Puzzle model in the database and then retrive it here</p>
     <Component /> 
     </div>
     : "404" }
  </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getPuzzle : setPuzzle
};

export default connect(mapState, mapDispatch)(SinglePuzzle);