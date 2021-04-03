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
    // <div id="homepage" style={{ height: '100vh' }}>
    <div id="homepage">
      <div id="overlay"></div>
      {/*<h3
        style={{
          width: '100vw',
          color: 'white',
          backgroundColor: 'purple',
          textAlign: 'center',
        }}
      >
        Welcome to escape-room
        /haunted/1
      </h3> */}
      {/* <h1> Welcome to escape-room </h1> */}

      <Navbar />

      <div className="heading">
        <h2>Select Game</h2>
      </div>
      <div id="game-div-wrapper">
        {defaultGames.map((game) => {
          return (
            <div id="game-div" key={game.id}>
              {/* <Link to={`${removeSpaceFromTheme(game.title)}/${game.id}`}>   */}

              <h3>{game.title}</h3>
              <img src={game.imgSrc} />
              {game.description}

              <Link to={`/${game.theme}/${game.id}/1`}>
                <button className="play">PLAY</button>
              </Link>
            </div>
          );
        })}
      </div>
      <hr />

      <h1 className="created-games">Games You've Created</h1>
      <div className="heading">
        {props.auth.id && (
          <Link to="/choosetheme">
            <button> + CREATE </button>
          </Link>
        )}
      </div>

      <div id="custom-game-div-wrapper">
        {customGames.length > 0 ? (
          customGames.map((game, idx) => (
            <div id="custom-game-div" key={idx}>
              <span
                style={{
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  // paddingBottom: '5px',
                }}
              >
                {game.title}
              </span>
              <img src={game.rooms[0].imgSrc} />
              <p>
                Created On<br></br>
                {`${formatDate(new Date(game.createdAt))}`}
              </p>
              <Link to={`/games/${game.id}/${game.rooms[0].id}/0`}>
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
      {/* <Link to="/haunted/intro">Haunted House</Link>
      <hr />
      <Link to="/houseofriddlez"> ~~House of Riddlez~~ </Link>
      <p>
        You wake up one morning only to find out that you are trapped in a House
        of Riddles. The only way out is to solve every riddle! But there's a
        catch...
      </p>
      <hr />
      <Link to="/Bobafett"> Steve Game </Link>
      <hr />
      <div>
        <Link to="/Bankgame"> Bank Game </Link>
        <p>
          In the following game, you will have to rob a bank and escape with all
          the $$$
        </p>
      </div>


      <hr /> */}
      <Link to="/dg">Dynamic Game</Link>
      <hr />

      {/* <hr />
      <Link to="/customize">Customize</Link> */}
      {/* <h3
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
      </h3> */}
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
