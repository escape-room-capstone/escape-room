import React, { useEffect } from 'react';
import cafe from "../../public/Theme_Images/cafe.jpg"
//import insideCafe from "../../public/Theme_Images/inside-cafe.jpg"
//import theWildForest from "../../public/Theme_Images/the-wild-forest.jpg"
import theWild from "../../public/Theme_Images/the-wild.jpg"
import '../../public/css/CreateGame.css';
import axios from "axios"
import { fetchThemes } from "../store/theme";
import { connect } from "react-redux";

const Createtheme = (props) => {

  useEffect(async()=>{
    console.log(props);
    console.log("we here", (await props.getThemes()));
    //this.props.getThemes();    
  })
  

  const imgClickHandler = () => {
    console.log("hello");    
  }
  
  const defaultThemes = ["haunted", "house", "bank", "star wars"];
  const imgSrcs = [cafe, theWild];

  return (
    <div> 
        <h3> You can choose from one of the following themes below... </h3> 
        <ul>
          {defaultThemes.map((theme, idx) => {
            return (
              <li key={idx}>
                {theme}
              </li>
            )
          }) }
        </ul>
        <h3> Or choose one of the following themes... </h3>
          {imgSrcs.map((src, idx) => {
            return (
              <img key={idx} onClick={imgClickHandler} src={src} alt=""></img>
            )
          })}
          
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getThemes : fetchThemes
};

export default connect(mapState, mapDispatch)(Createtheme);
