import React from 'react';
import '../../public/CSS/About.css';
import { Navbar } from './Navbar';

export const About = (props) => {
  return (
    <div id="about">
      <Navbar />
      <div className="section column">
        <h1>Technologies</h1>
        <div>
          <img src="/Images/AboutImages/react.png"></img>
          <img id="konva" src="/Images/AboutImages/reactkonva.png"></img>
          <img src="/Images/AboutImages/redux.png"></img>
          <img src="/Images/AboutImages/node.png"></img>
        </div>
        <div>
          <img src="/Images/AboutImages/express.png"></img>
          <img src="/Images/AboutImages/postgresql.png"></img>
          <img src="/Images/AboutImages/sequelize.svg"></img>
        </div>
      </div>
      <div className="section column">
        <h1>Challenges</h1>
        <ul>
          <li>
            Dynamically rendering front-end React components based on user data
            in database
          </li>
          <li></li>
        </ul>
      </div>
      <div className="section column">
        <h1>Future Enhancements</h1>
      </div>
    </div>
  );
};
