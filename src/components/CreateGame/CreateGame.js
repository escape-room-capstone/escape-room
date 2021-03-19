import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchTheme } from '../../store/singleTheme';
import axios from "axios"



const CreateGame = (props) => {

    const [title, setTitle] = useState("");
    const [numPuzzles, setNumPuzzles] = useState("");

    useEffect(() => {
        props.getTheme(props.match.params.id);
      }, []);

    //USING hard-coded user#2 for axios call...
      const submitCreateGame = async(e) => {
          e.preventDefault();
        await axios.post(`/api/users/${2}/games`, { theme: props.theme.name, title, numPuzzles })
        props.history.push("/addpuzzles");
      }
      

  return (
    <div>
        <button onClick={()=>props.history.push('/createtheme')}> back </button> 
        <form onSubmit={(e)=> submitCreateGame(e)}>

          <h1> Theme : {props.theme.name} </h1>
                <label> 
                    Title of game :
                <input style={{ width:"200px", marginLeft:"10px" }} value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
                </label>
                <label style={{ marginLeft: "10px" }}> 
                    Amount of puzzles : 
                <input style={{ width:"200px", marginLeft:"10px" }} value={numPuzzles} onChange={(e)=>setNumPuzzles(e.target.value)} type="text" />
                </label>
            <button style={{ marginLeft:"10px" }} type="submit">Create game</button>
        </form>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getTheme : fetchTheme
};

export default connect(mapState, mapDispatch)(CreateGame);