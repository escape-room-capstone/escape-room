import React, { useState, useEffect } from 'react';
import TimerBar from './TimerBar';

const GameTimer = (props) => {
    const { gameId, history, timer, countdown, roomSolved, timerToggle, saveCountdown, styleInput } = props;
    const [timerSwitch, setTimerSwitch] = useState(timerToggle);
    const [currCountdown, setCountdown] = useState(countdown);
    const [timerBarComplete, setTimerBar] = useState(0);

    // on first render of timer (when countdown is 0) initiate countdown with value from game timer
    useEffect(() => {
        countdown === -1 && setCountdown(timer);
    }, [countdown, timer]);

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

    // update competion % of the timer bar
    useEffect(() => {
        let percentage = Math.floor((currCountdown / timer) * 100);
        setTimerBar(Math.floor(percentage)) ;
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
            { currCountdown === 0
                ? <div id='fail-message'
                    style={{
                    color: 'red',
                    fontFamily: 'Stencil Std, fantasy',
                    fontSize: 50,
                    fontWeight: 'bold',
                    position: 'relative',
                    bottom: 5
                    }}
                >Time's up!</div>
                : <TimerBar barColor={styleInput.barColor} digitColor={styleInput.digitColor} completed={timerBarComplete} time={currCountdown} />
            }
        </div>
    )
}

export default GameTimer