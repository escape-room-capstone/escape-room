import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Navbar } from './Navbar';
import { getUserByToken } from '../store/auth';
import { fetchGames } from '../store/allGames';
import { fetchThemes } from '../store/theme';

import '../../public/CSS/Account.css';

const Account = (props) => {
  useEffect(() => {
    props.getGames();
  }, []);
  useEffect(() => {
    const checkForUser = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        await props.setUser();
      }
    };
    checkForUser();
  }, []);
  useEffect(() => {
    async function getData() {
      await props.getThemes();
    }
    getData();
  }, []);

  const formatDate = (date) => {
    date = date.toString().slice(0, 16);
    return date;
  };

  // console.log('props', props);

  //HELPER FUNCTION TO SORT THE ROOMS IN ORDER BY ROOM NUMBER !
  const sortByRoomNumber = (roomsArray) => {
    return roomsArray
      ? roomsArray.sort((roomA, roomB) => {
          return roomA.number - roomB.number;
        })
      : [];
  };

  const { allGames } = props;
  const userGames = allGames.filter((game) => game.userId === props.auth.id);
  // console.log('userGames', userGames);

  const themes = props.themes.filter((theme) => theme.userId === null);
  // console.log(themes, 'themes');
  const userThemes = props.themes.filter(
    (theme) => theme.userId === props.auth.id
  );

  const id = props.auth.id;
  return (
    <div id="account">
      <Navbar />
      <div id="accountDiv">
        <h1 id="heading-with-button">
          My Account{' '}
          <Link to={`/users/${id}/account/updateprofile`}>
            <button id="accountButton">+ UPDATE PROFILE</button>
          </Link>
        </h1>
      </div>
      <br />
      <div id="accountDiv">
        <h1 id="heading-with-button">
          My Games{' '}
          {props.auth.id && (
            <Link to="/choosetheme">
              <button id="accountButton"> + CREATE GAME </button>
            </Link>
          )}
        </h1>
        <div id="accountWrapper">
          {userGames.length > 0 ? (
            userGames.map((game, idx) => (
              <div id="accountGameDiv" key={idx}>
                <p
                  style={{
                    fontSize: '1.2rem',
                  }}
                >
                  {game.title ? game.title : `Game ${game.id}`}
                </p>
                <img
                  className="accountImg"
                  src={sortByRoomNumber(game.rooms)[0].imgSrc}
                />
                <p>
                  Created On<br></br>
                  {`${formatDate(new Date(game.createdAt))}`}
                </p>
                <Link
                  to={`/games/${game.id}/${
                    sortByRoomNumber(game.rooms)[0].id
                  }/0`}
                >
                  <button className="play">PLAY</button>
                </Link>
              </div>
            ))
          ) : (
            <h1 style={{ width: '100%' }} className="created-games">
              {' '}
              No Games Yet !
            </h1>
          )}
        </div>
      </div>
      <br />
      <div id="accountDiv">
        <h1 id="heading-with-button">
          My Themes{' '}
          <Link to={`/users/${props.auth.id}/createTheme`}>
            <button id="accountButton">+ CREATE THEME</button>
          </Link>
        </h1>
        <div id="accountWrapper">
          {userThemes.map((theme) => (
            <div id="accountGameDiv" key={theme.id}>
              <p
                style={{
                  fontSize: '1.2rem',
                }}
              >
                {' '}
                {theme.name ? theme.name : `Theme ${theme.id}`}{' '}
              </p>
              <Link to={`/theme/${theme.id}`}>
                <img
                  className="accountImg"
                  src={theme.backgroundImageOne}
                  alt="theme background image"
                />
              </Link>{' '}
              <p>
                Created On<br></br>
                {`${formatDate(new Date(theme.createdAt))}`}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Designed by VARKS */}
    </div>
  );
};

const mapToState = (state) => {
  // const { auth, user } = state;

  // return { auth, user };
  return state;
};

const mapToDispatch = {
  getGames: fetchGames,
  getThemes: fetchThemes,
  setUser: getUserByToken,
};

export default connect(mapToState, mapToDispatch)(Account);
