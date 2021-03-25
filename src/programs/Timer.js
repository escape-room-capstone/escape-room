import { React, useState, useEffect } from 'react';

const Timer = (props) => {
    // propse you pass will be timer determined for the game (i.e. 60 mins)
    // set initial timer state {minutes, seconds} to zero
    const { initialMinutes = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);


    // manage current timer in each game through timer's local state
    
    useEffect(() => {
        let initInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(initInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(initInterval);
        };
    });

    return (
        <div>
            { minutes === 0 && seconds === 0
                ? null
                : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default Timer