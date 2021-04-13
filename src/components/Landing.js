import React from 'react';
import '../../public/CSS/Landing.css';
import { Link, Redirect } from 'react-router-dom';

export const Landing = (props) => {
  return (
    <div id="landing">
      <h1>Puzzle Break</h1>

      <div>
        <Link to="/login">
          <button>MEMBER</button>
        </Link>

        <button
          onClick={() => {
            window.localStorage.clear();
            props.history.push('/home');
          }}
        >
          GUEST
        </button>
      </div>
    </div>
  );
};
