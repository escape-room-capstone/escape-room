import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchTheme } from '../../store/singleTheme';
import axios from "axios"
import { setPuzzles } from '../../store/puzzles';
import { componentMapping } from '../Puzzles/puzzles';
import { Puzzle1, Puzzle2, Puzzle3, Puzzle4, Puzzle5, Puzzle6 } from '../Puzzles/puzzles';
import '../../../public/css/CreateGame.css';


const AddPuzzles = (props) => {


    useEffect(() => {
        props.getPuzzles();
      }, []);

      const { puzzles } = props;
      // const puzzleNameArray = puzzles.map(puzzle => {
      //   return puzzle.name
      // })
      // const puzzleNameArray = ["Puzzle1", "Puzzle2", "Puzzle3", "Puzzle4", "Puzzle5", "Puzzle6"];

      // console.log(puzzleNameArray);
      


  return (
    <div className="puzzlesContainer">
      Select all the puzzles you would like in your game...
      <hr />
      {puzzles.map(puzzle => {
        const Component = componentMapping[puzzle.name];        
        return ( <div key={puzzle.id} className="puzzle">
          <h1>{puzzle.name}</h1>
          <button onClick={()=>props.history.push(`/puzzle/${puzzle.id}`)}> Details </button>
           <Component /> 
           <hr/>
           <button> Add Puzzle </button>
           </div>
           
        )
      })}
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getPuzzles : setPuzzles
};

export default connect(mapState, mapDispatch)(AddPuzzles);