import React, { useEffect } from 'react';
import { fetchThemes } from '../../store/theme';
import { fetchTheme } from '../../store/singleTheme';
import { connect } from 'react-redux';
import '../../../public/CSS/ChooseTheme.css';

const ChooseTheme = (props) => {
  useEffect(() => {
    props.getThemes();
  }, []);

  // const defaultThemes = ['haunted', 'house', 'bank', 'starwars'];
  const { themes } = props;
  //default themes will be theme with type of default
  const defaultThemes = themes.filter((theme) => theme.type === 'default');

  return (
    <div id="columnDiv">
      <div id="themeSection">
        <h3>
          You can choose from one of the following pre-built games below...
        </h3>
        <div id="choose-theme">
          {defaultThemes.map((theme, idx) => (
            <div id="themeMap" key={theme.id}>
              <h2>{theme.name}</h2>
              <img
                className="createGameImg"
                // onClick={() => imgClickHandler(theme.id)}
                src={theme.backgroundImageOne}
                alt="theme background image"
              ></img>
            </div>
          ))}
        </div>
      </div>

      <div id="themeSection">
        <h3> Or choose one of the following themes... </h3>
        <div id="choose-theme">
          {themes.map((theme) => (
            <div id="themeMap" key={theme.id}>
              <h2> {theme.name} </h2>
              <img
                className="createGameImg"
                onClick={() => props.history.push(`/theme/${theme.id}`)}
                src={theme.backgroundImageOne}
                alt="theme background image"
              ></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getThemes: fetchThemes,
  setTheme: fetchTheme,
};

export default connect(mapState, mapDispatch)(ChooseTheme);
