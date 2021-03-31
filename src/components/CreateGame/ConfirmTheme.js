import React, { useEffect } from 'react';
import '../../../public/css/CreateGame.css';
import { connect } from 'react-redux';
import { fetchTheme } from '../../store/singleTheme';

const ConfirmTheme = (props) => {
  
  useEffect(() => {
    props.getTheme(props.match.params.id);
  }, []);

  console.log(props);

  const { theme } = props;
  
  //Code breaks on first render because theme.images does not exist... use this conditional to prevent it from breaking...
  if(!theme.images){
    return "...loading"
  }
  
  return (
    <div>
      <h3> All images with this theme... </h3>
      {theme.images.map((image, idx) => {
        return (
          <img
            style={{ width: '48vw', margin: '10px' }}
            key={idx}
            src={image}
            alt=""
          ></img>
        );
      })}
      <div style={{ position: 'fixed', left: '46%', top: '50%' }}>
        <button onClick={() => props.history.push('/createtheme')}>
          {' '}
          Back{' '}
        </button>
        <button
          onClick={() => props.history.push(`/creategame/${theme.id}`)}
          style={{ marginLeft: '10px' }}
        >
          {' '}
          Use This Theme{' '}
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
