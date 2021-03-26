import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//hard-coded user Id for now
const userId = 2;

//url will be /users/userId/account/games
const _UserGames = (props) => {
  const [games, setGames] = useState([]);
  //   const userId = props.match.params.userId
  useEffect(() => {
    const fetchGames = async () => {
      const games = (await axios.get(`/api/users/${userId}/games`)).data;
      setGames(games);
    };
    fetchGames();
  }, []);

  return (
    <div id="user-games">
      <h1>Your Games</h1>
      {games.map((game, idx) => (
        <div key={idx}>
          <p>{game.description}</p>
          <Link
            to={
              game.theme.type === 'default'
                ? `/${game.theme}/${game.id}`
                : `/games/${game.id}/1`
            }
          >
            <button>PLAY</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const UserGames = connect((state) => state)(_UserGames);