import React from 'react';
import '../../public/CSS/Landing.css';
import { Link } from 'react-router-dom';

export const Landing = (props) => {
  return (
    <div id="landing">
      <h1>Escape The Room</h1>

      <div>
        <Link to="/login">
          <button>MEMBER</button>
        </Link>
        <Link to="/home">
          <button>GUEST</button>
        </Link>
      </div>
    </div>
  );
};
