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
          <li>Defining complex database model associations</li>
          <li>Converting static to dynamic rendering </li>
        </ul>
      </div>
      <div className="section column">
        <h1>Future Enhancements</h1>
        <ul>
          <li>Integrate with Firebase for real-time multiplayer experience</li>
          <li>Integrate with AWS S3 for storing uploaded user images</li>
          <li>Integrate video chat feature to multiplayer experience</li>
          <li>Ability for user to create puzzles</li>
        </ul>
      </div>

      <h1 className="shadow">The Team</h1>

      <div id="team">
        <div>
          <h2>Steve </h2>
          <img src="/Images/AboutImages/steve2.png"></img>
        </div>
        <div>
          <h2>Vanessa</h2>
          <img src="/Images/AboutImages/vanessa.png"></img>
        </div>

        <div>
          <h2>Kate</h2>
          <img src="/Images/AboutImages/kate.png"></img>
        </div>
        <div>
          <h2> Roman</h2>
          <img src="/Images/AboutImages/roman.png"></img>
        </div>
        <div>
          <h2>Arwinder</h2>
          <img src="/Images/AboutImages/arwinder.jpg"></img>
        </div>
      </div>
    </div>
  );
};
