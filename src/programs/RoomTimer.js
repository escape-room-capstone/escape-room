import React, {useState, useEffect } from 'react';

const RoomTimer = (props) => {
    const { countdown } = props;
    const [currCountdown, setCountdown] = useState(countdown);
    
    // split timer into minutes and seconds
    var minutes = Math.floor(currCountdown / 60);
    var seconds = currCountdown - minutes * 60;

    // update current countdown in timer's local state
    useEffect(() => {
        let initInterval = setInterval(() => {
            if (currCountdown > 0) {
                setCountdown(currCountdown - 1);
            }
            if (currCountdown === 0) {
                clearInterval(initInterval)
            }
        }, 1000)
        return () => {
            clearInterval(initInterval);
        };
    });
    return (
        <div>
            { currCountdown === 0 ? "Time's up!" :
                <h1> Time left in room: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}

export default RoomTimer