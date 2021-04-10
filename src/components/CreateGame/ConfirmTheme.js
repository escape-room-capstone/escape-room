import React, { useEffect } from 'react';
import '../../../public/css/CreateGame.css';
import { connect } from 'react-redux';
import { fetchTheme } from '../../store/singleTheme';
import '../../../public/CSS/ConfirmTheme.css';
import { Navbar } from '../Navbar';

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
      <Navbar />
      <div>        
      </div>
      <div id="divRow">
        {theme.images.map((image, idx) => {
          return (
            <div id="divImages" key={idx}>
              <img id="themeImg" style={{ borderRadius:"10%"}} src={image} alt=""></img>
            </div>
          );
        })}
      </div>
      <div id="heading-with-button">
        <button
          id="accountButton"
          onClick={() => props.history.push('/choosetheme')}
        >
          Back
        </button>
        <button
          id="accountButton"
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
