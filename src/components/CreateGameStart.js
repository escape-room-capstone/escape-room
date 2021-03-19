import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchTheme } from '../store/singleTheme';
import axios from "axios"


const CreateGameStart = (props) => {

    const [title, setTitle] = useState("");
    const [numPuzzles, setNumPuzzles] = useState(0);

    useEffect(() => {
        props.getTheme(props.match.params.id);
      }, []);

      const submitCreateGame = async(e, theme) => {
          e.preventDefault();
        await axios.post("/api/games", { theme: theme.name, title, numPuzzles })
      }

  return (
    <div>
        <button onClick={()=>props.history.push('/createtheme')}> back </button> 
        <form onSubmit={(e)=> submitCreateGame(e, props.theme)}>
                <label> 
                    Title of game :
                <input style={{ width:"200px"}} value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
                </label>
                <label> 
                    Amount of puzzles : 
                <input style={{ width:"200px"}} value={numPuzzles} onChange={(e)=>setNumPuzzles(e.target.value)} type="text" />
                </label>
            <button type="submit">Create game</button>
        </form>
         <img  style={{ height: "854px", width: "1440px" }}src={props.theme.backgroundImageOne}></img>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getTheme : fetchTheme
};

export default connect(mapState, mapDispatch)(CreateGameStart);