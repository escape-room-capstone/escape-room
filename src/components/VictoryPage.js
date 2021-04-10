import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGame, updateTimer } from '../store/game';
import { Burger } from './Burger';
import '../../public/CSS/VictoryPage.css';

const _VictoryPage = (props) => {
  // pick up data from props
  let { gameId } = props.match.params;
  const { game } = props;
  const { timer, countdown, userId } = game;

  // load game data when component mounts
  useEffect(() => {
    props.setGame(gameId);
  }, [gameId]);

  // determine user's current time to complete game
  const gameFinalTime = timer - countdown;
  var finalMinutes = Math.floor(gameFinalTime / 60);
  var finalSeconds = gameFinalTime - finalMinutes * 60;

  // end the game
  const handleEndGame = async () => {
    // save user's game completion time record
    // await props.saveRecord(userId, gameId, gameFinalTime)
    // reset game timer ('-1' is the default value of the countdown when game is created)
    const time = -1;
    await props.resetTimer(gameId, time);
    // send the user back to homepage
    props.history.push(`/home`);
  };

  // render victory page once the game was loaded
  if (!game) {
    return null;
  }
  return (
    <div id="victory-page">
      <Burger {...props} />
      {/* <div id="spacer" style={{ height: '100px' }}></div> */}

      <div
        id="victory-body"
        style={{
          height: '559px',
          width: '1000px',
          backgroundImage: 'url(/Images/success.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderRadius: '20px',
          margin: '0 auto',
          position: 'relative',
          boxShadow: '1px 1px 12px 6px deepskyblue',
        }}
      >
        <p>
          Congrats! It took you <br></br>
          <span>
            {finalMinutes ? `${finalMinutes} minutes and` : null} {finalSeconds}{' '}
            seconds
          </span>{' '}
          <br></br>
          to beat <br></br>the {game.title} game!
          <br></br>
          <button onClick={() => handleEndGame()}>HOME</button>
        </p>
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
    saveRecord: (userId, gameId, countdown) =>
      dispatch(saveRecord(userId, gameId, countdown)),
  };
};

export const VictoryPage = connect(mapState, mapDispatch)(_VictoryPage);
