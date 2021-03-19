import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchTheme } from '../../store/singleTheme';
import axios from "axios"
import { setPuzzles } from '../../store/puzzles';



const AddPuzzles = (props) => {


    useEffect(() => {
        props.getPuzzles();
      }, []);

    
      const { puzzles } = props;

  return (
    <div>
        {puzzles.map(puzzle => {
            return (
                <div onClick={()=>props.history.push(`/puzzle/${puzzle.id}`)} key={puzzle.id}>
                    {puzzle.name}
                    <hr />
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