import React, { useEffect } from 'react';
import { fetchThemes } from "../../store/theme";
import { fetchTheme } from "../../store/singleTheme";
import { connect } from "react-redux";

const ChooseTheme = (props) => {

  useEffect(() => {
    props.getThemes();
  }, []);
  

  

  const imgClickHandler = async(themeId) => {
    await props.setTheme(themeId);
    props.history.push(`/theme/${themeId}`);
  }
  
  const defaultThemes = ["haunted", "house", "bank", "star wars"];
  
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
              <div key={theme.id}>
                <h2> {theme.name} </h2>
              <img className="createGameImg" onClick={()=> imgClickHandler(theme.id)} src={theme.backgroundImageOne} alt=""></img>
              </div>
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

export default connect(mapState, mapDispatch)(ChooseTheme);