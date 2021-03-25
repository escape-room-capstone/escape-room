import React, { useState } from "react";

const Clicker = () => {
    // set initial count state to zero
    const [count, setCount] = useState(0);

    // click increment event handler
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    // *** measage when click count is exceed - need to define params

    return (
        <div>
            <div>
                <button onClick={handleDecrement}>-</button>
                <h5>Count is {count}</h5>
                <button onClick={handleIncrement}>+</button>
            </div>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}

export default Clicker