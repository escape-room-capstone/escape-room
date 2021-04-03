import React, { useEffect } from 'react';
import '../../../public/css/CreateGame.css';
import { connect } from 'react-redux';
import { fetchTheme } from '../../store/singleTheme';
import '../../../public/CSS/ConfirmTheme.css';

const ConfirmTheme = (props) => {
  useEffect(() => {
    props.getTheme(props.match.params.id);
  }, []);

  console.log(props);

  const { theme } = props;

  //Code breaks on first render because theme.images does not exist... use this conditional to prevent it from breaking...
  if (!theme.images) {
    return '...loading';
  }

  return (
    <div id="divColumn">
      <div>
        <h3 id="themeText"> All images in this theme... </h3>
      </div>
      <div id="divRow">
        {theme.images.map((image, idx) => {
          return (
            <div id="divImages" key={idx}>
              <img id="themeImg" src={image} alt=""></img>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => props.history.push('/choosetheme')}>Back</button>
        <button
          onClick={() => props.history.push(`/creategame/${theme.id}`)}
          style={{ marginLeft: '10px' }}
        >
          Use This Theme
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getTheme: fetchTheme,
};

export default connect(mapState, mapDispatch)(ConfirmTheme);
