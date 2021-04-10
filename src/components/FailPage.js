import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGame, updateTimer } from '../store/game';
import { Burger } from './Burger';
import '../../public/CSS/ChooseTheme.css';

const _FailPage = (props) => {
  // pick up data from props
  let { gameId } = props.match.params;
  const { game } = props;
  const { rooms } = game;

  // load game data when component mounts
  useEffect(() => {
    props.setGame(gameId);
  }, [gameId]);

  // sort the rooms in order using the room['number']
  const sortGameRooms = (gameRooms) => {
    if (rooms) {
      const sorted = gameRooms.sort((roomA, roomB) => {
        return roomA.number - roomB.number;
      });
      return sorted;
    }
  };

  // end the game
  const handleEndGame = async (e) => {
    // reset game timer ('-1' is the default value of the countdown when game is created)
    const time = -1;
    await props.resetTimer(gameId, time);
    // sort the game rooms
    const sortedGameRooms = sortGameRooms(rooms);
    // send user home or restart game -- if restarting, go to different url depending on type of game
    e.target.name === 'restart'
      ? !game.userId
        ? props.history.push(`/${game.theme}/${gameId}`)
        : props.history.push(`/games/${gameId}/${sortedGameRooms[0].id}/0`)
      : props.history.push('/home');
  };

  // render victory page once the game was loaded
  if (!game) {
    return null;
  }
  return (
    <div id="victory-page">
      <Burger {...props} />
      <div id="spacer" style={{ height: '100px' }}></div>
      <div
        id="victory-body"
        style={{
          height: '559px',
          width: '1000px',
          backgroundImage: 'url(/Images/fail.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          margin: '0 auto',
          borderRadius: '20px',
          position: 'relative',
          boxShadow: '1px 1px 12px 6px deepskyblue',
        }}
      >
        <div id='fail-buttons'
          style={{
            position: 'relative',
            left: 380,
            top: 427,
          }}
        >
          <button id='createButton' name="restart" onClick={(e) => handleEndGame(e)}>Restart game</button>
          <button id='createButton' name="end" onClick={(e) => handleEndGame(e)}>Return home</button>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    setGame: (gameId) => dispatch(fetchGame(gameId)),
    resetTimer: (userId, gameId, time) =>
      dispatch(updateTimer(userId, gameId, time)),
  };
};

export const FailPage = connect(mapState, mapDispatch)(_FailPage);
