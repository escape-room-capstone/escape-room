import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../store/allGames';
import { logout } from '../store/auth';
import { Navbar } from './Navbar';
import '../../public/CSS/Homepage.css';
import { getUserByToken } from '../store/auth';

const Homepage = (props) => {
  useEffect(() => {
    props.getGames();
  }, []);
  useEffect(() => {
    const checkForUser = async () => {
      const token = window.localStorage.getItem('token');
      console.log(token, 'token');
      if (token) {
        await props.setUser();
      }
    };
    checkForUser();
  }, []);

  const { allGames } = props;
  const defaultGames = allGames.filter((game) => !game.userId);
  console.log(defaultGames, 'defaultgames');
  //will eventually need a check for if a game is public/private
  const customGames = allGames.filter((game) => game.userId);
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
      <div>
        <Navbar />
        {/* <Link to="/login">LOGIN</Link> <br></br>
        {props.auth.id && <div>Hello, {props.auth.email}</div>}
        <Link to="/signup">SIGN UP</Link>
        <br></br>
        <button onClick={() => props.logout()}>LOGOUT</button>
        <hr /> */}
      </div>
      <div className="heading">
        <h1>Games</h1>{' '}
        {props.auth.id && (
          <Link to="/choosetheme">
            <button> + CREATE </button>
          </Link>
        )}
      </div>
      <div id="game-div-wrapper">
        {defaultGames.map((game) => {
          return (
            <div id="game-div" key={game.id}>
              {/* <Link to={`${removeSpaceFromTheme(game.title)}/${game.id}`}>   */}
              <div>
                <div>
                  <h3>{game.title}</h3>
                </div>
                <img src={game.imgSrc} />
              </div>
              <p>{game.description}</p>

              <Link to={`/${game.theme}/${game.id}/1`}>
                <button className="play">PLAY</button>
              </Link>
            </div>
          );
        })}
      </div>
      <hr />
      <div>
        {customGames.map((game, idx) => (
          <div key={idx}>
            <Link to={`/games/${game.id}/1`}>{game.title}</Link>
            <hr />
          </div>
        ))}
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
      <Link to="/choosetheme"> Create game </Link>
      <hr />
      {/* <hr /> */}
      {/* <Link to="/customize">Customize</Link> */}
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
