import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../store/allGames';
import auth, { logout } from '../store/auth';
import { Navbar } from './Navbar';
import '../../public/CSS/Homepage.css';
import { getUserByToken } from '../store/auth';
import { UserGames } from './UserGames';

const Homepage = (props) => {
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
  const formatDate = (date) => {
    date = date.toString().slice(0, 16);
    return date;
  };
  const { allGames } = props;
  const defaultGames = allGames.filter((game) => !game.userId);
  console.log(defaultGames, 'defaultgames');
  //will eventually need a check for if a game is public/private
  const customGames = allGames.filter((game) => game.userId === props.auth.id);
  console.log(customGames, 'customGames');
  const removeSpaceFromTheme = (title) => {
    const noSpaceTitle = title.split(' ').join('');
    console.log(noSpaceTitle);
    return noSpaceTitle;
  };

  return (
    <div id="homepage">
      {/* <div id="overlay"></div> */}
      <Navbar />
      <div className="heading">
        <h2>Select Game</h2>
      </div>
      <div id="game-div-wrapper">
        {defaultGames.map((game) => {
          return (
            <div id="game-div" key={game.id}>
              <div>
                <h3>{game.title}</h3>
              </div>
              <div>
                <img src={game.imgSrc} />
              </div>
              <div id="scroll">{game.description}</div>
              <div>
                <Link to={`/${game.theme}/${game.id}/1`}>
                  <button className="play">PLAY</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      {props.auth.id ? (
        <div>
          <h1 className="created-games">Games You've Created</h1>
          {/* <div id="custom-game-div-wrapper"> */}
          <div id="game-div-wrapper">
            {customGames.length > 0 ? (
              customGames.map((game, idx) => (
                <div id="game-div" key={idx}>
                  <div>
                    <h3>{game.title ? game.title : `Game ${game.id}`}</h3>
                  </div>
                  <div>
                    <img src={game.rooms[0].imgSrc} />
                  </div>
                  <div id="scroll">{game.description}</div>
                  <div>
                    Created On: {` ${formatDate(new Date(game.createdAt))}`}
                  </div>
                  <div>
                    <Link to={`/games/${game.id}/${game.rooms[0].id}/0`}>
                      <button className="play">PLAY</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <h1 style={{ width: '100%' }} className="created-games">
                {' '}
                No Games Yet !
              </h1>
            )}
          </div>{' '}
          <div className="heading">
            {props.auth.id && (
              <Link to="/choosetheme">
                <button> + CREATE GAME </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
      Designed by VARKS
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = {
  getGames: fetchGames,
  logout: logout,
  setUser: getUserByToken,
};

export default connect(mapState, mapDispatch)(Homepage);
