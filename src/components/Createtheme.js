import React, { useEffect } from 'react';
import cafe from "../../public/Theme_Images/cafe.jpg"
//import insideCafe from "../../public/Theme_Images/inside-cafe.jpg"
//import theWildForest from "../../public/Theme_Images/the-wild-forest.jpg"
import theWild from "../../public/Theme_Images/the-wild.jpg"
import '../../public/css/CreateGame.css';
import axios from "axios"
import { fetchThemes } from "../store/theme";
import { fetchTheme } from "../store/singleTheme";
import { connect } from "react-redux";

const Createtheme = (props) => {

  useEffect(() => {
    props.getThemes();
  }, []);
  

  const imgClickHandler = async(themeId, image) => {
    // console.log(props);
    await axios.put(`/api/themes/${themeId}`, {image})
    await props.setTheme(themeId);
    props.history.push(`/creategamestart/${themeId}`);
  }
  
  const defaultThemes = ["haunted", "house", "bank", "star wars"];
  const images = {
    cafe,
    theWild
  }
  const { themes } = props;

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
          {themes.map(theme => {
            return (
              <img key={theme.id} onClick={()=> imgClickHandler(theme.id, images[theme.name])} src={images[theme.name]} alt=""></img>
            )
          })}
          
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getThemes : fetchThemes,
  setTheme : fetchTheme
};

export default connect(mapState, mapDispatch)(Createtheme);
