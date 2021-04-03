import React, {useState, useEffect } from 'react';

const RoomTimer = (props) => {
    // props passed: initial time set for the game
    // set default timer state {minutes, seconds} to zero
    const { initMin = 0, initSec = 0 } = props;

    const [min, setMin] = useState(initMin);
    const [sec, setSec] = useState(initSec);

    // manage active timer in each game timer's local state
    useEffect(() => {
        let initInterval = setInterval(() => {
            if (sec > 0) {
                setSec(sec - 1);
            }
            if (sec === 0) {
                if (min === 0) {
                    clearInterval(initInterval)
                } else {
                    setMin(min - 1);
                    setSec(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(initInterval);
        };
    });

    return (
        <div>
            { min === 0 && sec === 0 ? "Time's up!" :
                <h1>Time left in room {min}:{sec < 10 ? `0${sec}`:sec}</h1>
            }
        </div>
    )
}

export default RoomTimer