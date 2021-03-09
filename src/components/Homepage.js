import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = (props) => {
  console.log(props);

  return (
    <div style={{ height: '100vh' }}>
      <h3
        style={{
          width: '100vw',
          color: 'white',
          backgroundColor: 'purple',
          textAlign: 'center',
        }}
      >
        Welcome to escape-room
      </h3>

      <Link to="/game1"> Game 1 </Link>
      <hr />
      <Link to="/game2"> Game 2 </Link>
      <hr />
      <Link to="/game3"> Game 3 </Link>
      <hr />
      <Link to="/haunted/intro">Haunted House</Link>

      <h3
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100vw',
          color: 'white',
          backgroundColor: 'purple',
          textAlign: 'center',
        }}
      >
        {' '}
        Designed by VARKS{' '}
      </h3>
    </div>
  );
};

export default Homepage;
