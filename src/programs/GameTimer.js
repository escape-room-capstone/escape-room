import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimer, setCountdown } from '../store/gameUtils';
import '../../public/CSS/CustomGame.css';

const GameTimer = (props) => {
  // props passed: initial timer set for the game
  // set default timer state {minutes, seconds} to zero
  const { initMin, initSec } = props;
  const { countdown, initTimer } = useSelector(
    (state) => state.gameUtils.gameTimer
  );
  const dispatch = useDispatch();

  // set timer local state {minutes, seconds} to zero
  const [min, setMin] = useState(countdown.min);
  const [sec, setSec] = useState(countdown.sec);

  // initiate timer
  useEffect(() => {
    if (initTimer.min === 0 && initTimer.sec === 0) {
      dispatch(setTimer(initMin, initSec));
      setSec(initSec);
      setMin(initMin);
    }
  }, []);

  // manage active countdown in timer's local state
  useEffect(() => {
    let initInterval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(initInterval);
        } else {
          setMin(min - 1);
          setSec(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(initInterval);
    };
  });

  return (
    <div>
      {min === 0 && sec === 0 ? (
        "Time's up!"
      ) : (
        <h1>
          {' '}
          Time left in game: {min}:{sec < 10 ? `0${sec}` : sec}
        </h1>
      )}
    </div>
  );
};

export default GameTimer;
