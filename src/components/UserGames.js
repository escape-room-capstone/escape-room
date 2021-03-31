import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../public/CSS/UserGames.css';

//url will be /users/userId/account/games
const _UserGames = (props) => {
  const [games, setGames] = useState([]);
  // const userId = props.match.params.userId;
  const userId = props.auth.id || props.match.params.userId;
  useEffect(() => {
    const fetchGames = async () => {
      const games = (await axios.get(`/api/users/${userId}/games`)).data;
      setGames(games);
    };
    fetchGames();
  }, []);
  const formatDate = (date) => {
    date = date.toString().slice(0, 16);
    return date;
  };
  const userpageStyles = {
    backgroundImage: '../../public/Images/greywallpaper.jpeg',
  };
  console.log(games);
  console.log(props, 'props');
  return (
    <div id="user-games">
      <h1>Your Games</h1>
      <div id="user-games-wrapper">
        {games.map((game, idx) => (
          <div id="user-game-div" key={idx}>
            <span style={{ fontSize: '1.4rem', textAlign: 'center' }}>
              Title: {game.title}
            </span>
            <img src={game.rooms[0].imgSrc} />
            <p>Description: {game.description}</p>
            <p>Created On {`${formatDate(new Date(game.createdAt))}`}</p>
            <div className="play-button">
              <Link to={`/games/${game.id}/${game.rooms[0].id}`}>
                <button className="play">PLAY</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//   return (
//     <div id="user-games">
//       <h1>Your Games</h1>
//       {games.map((game, idx) => (
//         <div key={idx}>
//           <p>{game.title}</p>
//           <p>{game.description}</p>
//           <Link
//             to={
//               game.theme.type === 'default'
//                 ? `/${game.theme}/${game.id}`
//                 : `/games/${game.id}/${game.rooms[0].id}`
//             }
//           >
//             <button>PLAY</button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

export const UserGames = connect((state) => state)(_UserGames);
