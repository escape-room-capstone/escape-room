import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchGames } from '../store/allGames';
// import UserSignup from './UserSignup';

const Homepage = (props) => {

  useEffect(() => {
    props.getGames();
  }, []);

  const { allGames } = props;


  const removeSpaceFromTheme = (theme) => {
    const noSpaceTheme = theme.split(" ").join("");
    console.log(noSpaceTheme);
    return noSpaceTheme;
  }
  
  
  return (
    <div style={{ height: '100vh' }}>
      {/* <UserSignup/>
      <h3
        style={{
          width: '100vw',
          color: 'white',
          backgroundColor: 'purple',
          textAlign: 'center',
        }}
      >
        Welcome to escape-room
      </h3> */}
      <h1> Welcome to escape-room </h1>
      {allGames.map(game => {
        return (<div key={game.id}>
          <Link to={`${removeSpaceFromTheme(game.theme)}/${game.id}`}> {game.title} </Link>
          <hr />
          </div>
        )
      })}
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
      <Link to ="/choosetheme"> Create game </Link>
      <hr />
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
  getGames : fetchGames
};

export default connect(mapState, mapDispatch)(Homepage);
