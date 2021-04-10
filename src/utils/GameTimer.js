import React, { useState, useEffect } from 'react';

const GameTimer = (props) => {
    const { gameId, history, timer, countdown, roomSolved, timerToggle, saveCountdown } = props;
    const [timerSwitch, setTimerSwitch] = useState(timerToggle);
    const [currCountdown, setCountdown] = useState(countdown);

    // on first render of timer (when countdown is 0) initiate countdown with value from game timer
    useEffect(() => {
        countdown === -1 && setCountdown(timer);
    }, [countdown, timer]);

    // split timer into minutes and seconds
    var minutes = Math.floor(currCountdown / 60);
    var seconds = currCountdown - minutes * 60;

     // update current countdown in timer's local state
    useEffect(() => {
        if (timerSwitch) {
            let initInterval = setInterval(() => {
                if (currCountdown > 0) {
                    setCountdown(currCountdown - 1);
                }
                if (currCountdown === 0) {
                    clearInterval(initInterval)
                    history.push(`/games/${gameId}/fail`)
                }
                if (roomSolved) {
                    clearInterval(initInterval)
                }
            }, 1000)
            return () => {
                clearInterval(initInterval);
            };
        }
    });

    // if room is solved (1) stop timer (2) pass current countdown to the parent to upadte the game 
    useEffect(() => {
        if (roomSolved) {
            setTimerSwitch(false)
            saveCountdown(currCountdown)
        }
    }, [roomSolved, currCountdown]);

    return (
        <div>
            { currCountdown === 0 ? "Time's up!" :
                <h1> Time left in game: {minutes}:{seconds < 10 ? `0${seconds}`:seconds}</h1>
            }
        </div>
    )
}

export default GameTimer