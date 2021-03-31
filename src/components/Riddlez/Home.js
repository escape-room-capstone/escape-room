import React, { useState, useEffect } from 'react';
import '../../../public/CSS/HouseOfRiddlez.css';

import { connect, useSelector, useDispatch } from 'react-redux';

const Home = (props) => {
  console.log('houseRiddlezProps=>', props);
  const [_isHome1, setHome1] = useState(false);
  const [_isHome2, setHome2] = useState(false);
  const [_isHome3, setHome3] = useState(false);
  const [_isHome4, setHome4] = useState(false);
  const [_isHome5, setHome5] = useState(false);

  useEffect(() => {
    if (_isHome1) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isHome1: true,
        },
        [_isHome1]
      );
    }
    if (_isHome2) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isHome2: true,
        },
        [_isHome2]
      );
    }
    if (_isHome3) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isHome3: true,
        },
        [_isHome3]
      );
    }
    if (_isHome4) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isHome4: true,
        },
        [_isHome4]
      );
    }

    if (_isHome5) {
      props.setRouteLocation(
        {
          ...props.routeLocation,
          isHome: false,
          isHome5: true,
        },
        [_isHome5]
      );
    }
  });

  return (
    <div className="houseContainer">
      <div className="background" id="home">
        <button
          className="secretButton"
          id="home2Button"
          onClick={() => {
            // this is the upstairs room on the left
            setHome2(true);
          }}
        ></button>

        <button
          className="secretButton"
          id="home1Button"
          onClick={() => {
            // this is the attic room on the top right
            setHome1(true);
          }}
        ></button>

        <button
          className="secretButton"
          id="home5Button"
          onClick={() => {
            // this is the living room, first on bottomleft (front door click)
            setHome5(true);
          }}
        ></button>

        <button
          className="secretButton"
          id="home4Button"
          onClick={() => {
            // this is the room in the middle downstairs (window click)
            setHome4(true);
          }}
        ></button>

        <button
          className="secretButton"
          id="home3Button"
          onClick={() => {
            // this is the room downstairs in the back (white door click)
            setHome3(true);
          }}
        ></button>
      </div>
    </div>
  );
};

const mapToState = (state) => {
  return state;
};

export default connect(mapToState)(Home);
